interface MapConfig {
    minBuildings: number;
    thresholdHigh: number;
    thresholdMedium: number;
    colorHigh: string;
    colorMedium: string;
    colorLow: string;
    displayMode: "individual" | "neighbourhood";
}

interface Row {
    LATITUDE: string | number;
    LONGITUDE: string | number;
    "CURRENT BUILDING EVAL SCORE": string | number;
    "SITE ADDRESS": string;
}

interface StatsCollection  { count: number; mean: number; std: number; median: number; min: number; max: number }


export interface MapRendererProps {
    mapConfig: MapConfig;
    rowtype: Row;
    statsByNeighbourhoodType: Record<string, StatsCollection>
}
