import "./App.css";
import InputForm from "./components/InputForm/InputForm.tsx";
import Map from "./components/Map/Map.tsx";
import OutputForm from "./components/OutputForm/OutputForm.tsx";
import { useState } from "react";
import { MapRendererProps } from "./components/Map/Map.types";
import { api } from "./data/api.ts";

const App = () => {
  const fetchData = async () => {
    const data = await api.get("/package_show", { params: { id: "dinesafe" } });
    console.log(data);
    return data;
  }
  fetchData();

  // Hooks
  const [mapConfig, setMapConfig] = useState<MapRendererProps["mapConfig"]>({
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
      <InputForm mapConfig={mapConfig} setMapConfig={setMapConfig} />
      <Map mapConfig={mapConfig} />
      <OutputForm />
    </>
  );
};

export default App;
