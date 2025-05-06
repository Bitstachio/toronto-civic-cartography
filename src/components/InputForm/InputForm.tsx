const InputForm = ({ mapConfig, setMapConfig }) => {
  return (
    <form>
      <label htmlFor="input-min-buildings">
        Minimum Buildings
        <input
          type="number"
          min="0"
          step="1"
          value={mapConfig.minBuildings}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              minBuildings: e.target.value,
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
              thresholdHigh: e.target.value,
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
              thresholdMedium: e.target.value,
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
          value={mapConfig.displayMode}
          onChange={(e) =>
            setMapConfig((prev) => ({
              ...prev,
              displayMode: e.target.value,
            }))
          }
        >
          <option value="individual">Individual</option>
          <option value="City_Neighbourhoods.geojson">Neighbourhood</option>
          <option value="Former_Municipality_Boundaries.geojson">Former Municipality Boundaries</option>
          <option value="City_Wards.geojson">City Wards</option>
        </select>
      </label>
    </form>
  );
};

export default InputForm;
