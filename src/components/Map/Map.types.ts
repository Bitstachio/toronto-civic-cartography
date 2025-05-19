export interface MapConfig {
  minBuildings: number;
  thresholdHigh: number;
  thresholdMedium: number;
  colorHigh: string;
  colorMedium: string;
  colorLow: string;
  displayMode: "individual" | "neighbourhood";
}

export interface Row {
  LATITUDE: string | number;
  LONGITUDE: string | number;
  "CURRENT BUILDING EVAL SCORE": string | number;
  "SITE ADDRESS": string;
}

export interface SummaryStats {
  count: number;
  mean: number;
  std: number;
  median: number;
  min: number;
  max: number;
}

export type NeighbourhoodStats = Record<string, SummaryStats>;
