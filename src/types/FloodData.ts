export interface FloodArea {
  county: string;
  riverOrSea: string;
}

export interface FloodData {
  id: string;
  description: string;
  eaAreaName: string;
  floodArea: FloodArea;
  message: string;
  severity: string;
  severityLevel: number;
  timeMessageChanged: string;
}
