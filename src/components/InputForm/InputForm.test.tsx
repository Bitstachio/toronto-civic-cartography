import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import InputForm from "./InputForm.tsx";
import { MapConfig } from "../Map/Map.types.ts";

describe("InputForm", () => {
  const mockMapConfig: MapConfig = {
    minBuildings: 10,
    thresholdHigh: 100,
    thresholdMedium: 50,
    colorHigh: "#FF0000",
    colorMedium: "#FFA500",
    colorLow: "#00FF00",
    displayMode: "individual",
  };
  const mockSetMapConfig = vi.fn();
  const mockSetDatasetId = vi.fn();

  it("renders", () => {
    render(<InputForm mapConfig={mockMapConfig} setMapConfig={mockSetMapConfig} setDatasetId={mockSetDatasetId} />);

    expect(screen.getByLabelText("Minimum Buildings")).toBeInTheDocument();
  });
});
