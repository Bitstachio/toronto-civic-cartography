import "./App.css";
import InputForm from "./components/InputForm/InputForm.tsx";
import Map from "./components/Map/Map.tsx";
import OutputForm from "./components/OutputForm/OutputForm.tsx";
import { useState } from "react";

const App = () => {
  // Hooks
  const [mapConfig, setMapConfig] = useState({
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
