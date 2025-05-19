import "./App.css";
import InputForm from "./components/InputForm/InputForm.tsx";
import Map from "./components/Map/Map.tsx";
import OutputForm from "./components/OutputForm/OutputForm.tsx";
import { useState } from "react";
import { api } from "./data/api.ts";
import { useQuery } from "@tanstack/react-query";
import { MapConfig } from "./components/Map/Map.types.ts";

const App = () => {
  const [datasetId, setDatasetId] = useState<string>("apartment-building-registration");

  const { data } = useQuery({
    queryKey: ["dataset", datasetId],
    queryFn: async () => {
      const entrypoint = await api.get("/api/3/action/package_show", { params: { id: datasetId } });
      const dumpId = entrypoint.data.result.resources[0].id;
      return api.get("/datastore/dump/" + dumpId);
    },
  });

  // Hooks
  const [mapConfig, setMapConfig] = useState<MapConfig>({
    minBuildings: 0,
    thresholdHigh: 90,
    thresholdMedium: 80,
    colorHigh: "#008000",
    colorMedium: "#FFA500",
    colorLow: "#FF0000",
    displayMode: "individual",
  });

  return (
    <>
      <InputForm mapConfig={mapConfig} setMapConfig={setMapConfig} setDatasetId={setDatasetId} />
      <Map mapConfig={mapConfig} />
      <OutputForm />
    </>
  );
};

export default App;
