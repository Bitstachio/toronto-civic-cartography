import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import Papa from "papaparse";
import * as turf from "@turf/turf";
import L from "leaflet";

const MapRenderer = ({ mapConfig }) => {
  const map = useMap();
  let currentLayer = useRef(null);

  const getColor = (score) => {
    return score >= mapConfig.thresholdHigh
      ? mapConfig.colorHigh
      : score >= mapConfig.thresholdMedium
        ? mapConfig.colorMedium
        : mapConfig.colorLow;
  };

  useEffect(() => {
    loadMap("Apartment Building Evaluations 2023 - current.csv");
  }, [mapConfig]);

  const loadMap = (file) => {
    Papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const buildings = results.data.map((row) => ({
          latitude: parseFloat(row["LATITUDE"]),
          longitude: parseFloat(row["LONGITUDE"]),
          score: parseFloat(row["CURRENT BUILDING EVAL SCORE"]),
          address: row["SITE ADDRESS"],
        }));

        const geoData = await fetch(`public/${mapConfig.displayMode}`).then((res) => res.json());
        const scores = {};
        const counts = {};

        buildings.forEach((b) => {
          if (!isNaN(b.latitude) && !isNaN(b.longitude) && !isNaN(b.score)) {
            const point = turf.point([b.longitude, b.latitude]);

            for (const feature of geoData.features) {
              const name = feature.properties.AREA_NAME;
              if (turf.booleanPointInPolygon(point, feature)) {
                if (!scores[name]) scores[name] = [];
                scores[name].push(b.score);

                counts[name] = (counts[name] || 0) + 1;
                break;
              }
            }
          }
        });

        // Compute stats
        let statsByNeighbourhood = {};
        for (let name in scores) {
          if (counts[name] >= mapConfig.minBuildings) {
            const values = scores[name];
            const count = values.length;
            const mean = values.reduce((a, b) => a + b, 0) / count;
            const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / count);
            const sorted = [...values].sort((a, b) => a - b);
            const median =
              count % 2 === 0 ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2 : sorted[Math.floor(count / 2)];
            const min = sorted[0];
            const max = sorted[sorted.length - 1];

            statsByNeighbourhood[name] = {
              count,
              mean,
              std,
              median,
              min,
              max,
            };
          }
        }

        // Render filtered neighborhoods with stats
        if (currentLayer.current) {
          map.removeLayer(currentLayer.current);
        }

        currentLayer.current = L.geoJSON(geoData, {
          style: function (feature) {
            const name = feature.properties.AREA_NAME;
            const stats = statsByNeighbourhood[name];
            return stats
              ? {
                  color: "#333",
                  weight: 1,
                  fillColor: getColor(stats.mean),
                  fillOpacity: 0.5,
                }
              : {
                  fillOpacity: 0,
                };
          },
          onEachFeature: function (feature, layer) {
            const name = feature.properties.AREA_NAME;
            const stats = statsByNeighbourhood[name];
            if (stats) {
              layer.bindPopup(
                `<strong>${name}</strong><br>
                Buildings: ${stats.count}<br>
                Mean: ${stats.mean.toFixed(1)}<br>
                Median: ${stats.median.toFixed(1)}<br>
                Std Dev: ${stats.std.toFixed(1)}<br>
                Min: ${stats.min}<br>
                Max: ${stats.max}`,
              );
            }
          },
        }).addTo(map);
      },
    });
  };

  return null;
};

export default MapRenderer;
