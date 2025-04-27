import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapRenderer from "./MapRenderer.tsx";

const Map = ({ mapConfig }) => {
  return (
    <MapContainer center={[43.7, -79.4]} zoom={11} scrollWheelZoom={false} id="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapRenderer mapConfig={mapConfig} />
    </MapContainer>
  );
};

export default Map;
