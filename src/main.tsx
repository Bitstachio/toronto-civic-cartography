import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootswatch/dist/litera/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);
