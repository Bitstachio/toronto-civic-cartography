import { datasets } from "../../data/datasets.ts";
import { useState } from "react";
import { MapConfig } from "../Map/Map.types.ts";

interface InputFormProps {
  mapConfig: MapConfig;
  setMapConfig: React.Dispatch<React.SetStateAction<MapConfig>>;
  setDatasetId: (datasetId: string) => void;
}

const InputForm = ({ mapConfig, setMapConfig, setDatasetId }: InputFormProps) => {
  const [intermediaryDatasetId, setIntermediaryDatasetId] = useState<string>("apartment-building-registration");

  return (
    <form>
      <label htmlFor="input-min-buildings">
        Minimum Buildings
        <input
          id="input-min-buildings"
          type="number"
          min="0"
          step="1"
          value={mapConfig.minBuildings}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              minBuildings: parseInt(e.target.value),
            }))
          }
        />
      </label>
      <br />
      <label>
        High Score Color
        <input
          type="color"
          value={mapConfig.colorHigh}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              colorHigh: e.target.value,
            }))
          }
        />
      </label>
      <label>
        High Threshold
        <input
          type="number"
          min="0"
          step="1"
          value={mapConfig.thresholdHigh}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              thresholdHigh: parseInt(e.target.value),
            }))
          }
        />
      </label>
      <br />
      <label>
        Medium Score Color
        <input
          type="color"
          value={mapConfig.colorMedium}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              colorMedium: e.target.value,
            }))
          }
        />
      </label>
      <label>
        Medium Threshold
        <input
          type="number"
          min="0"
          step="1"
          value={mapConfig.thresholdMedium}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              thresholdMedium: parseInt(e.target.value),
            }))
          }
        />
      </label>
      <br />
      <label>
        Low Score Color
        <input
          type="color"
          value={mapConfig.colorLow}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              colorLow: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <label htmlFor="select-display-mode">
        Display Mode
        <select
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              displayMode: e.target.value as "individual" | "neighbourhood",
            }))
          }
        >
          <option value="individual">Individual</option>
          <option value="neighbourhood">Neighbourhood</option>
        </select>
      </label>
      <br />
      <label htmlFor="dataset">
        Dataset
        <select name="dataset" id="dataset" onChange={(e) => setIntermediaryDatasetId(e.target.value)}>
          {datasets.map((dataset) => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.title}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={() => setDatasetId(intermediaryDatasetId)}>
        Apply
      </button>
    </form>
  );
};

export default InputForm;
