export type LayoutType = 'sky' | 'surface' | 'depths'
export type zoom = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'

export interface MarkerType {
  coords: number[];
  elv: number;
  id: string;
  name?: string;
  link?: string;
  path?: number[][];
  // zoomAdjustedCoords?: {
  //   [key: any]: number[]
  // }
}

export interface IconType {
  url: string,
  width: number,
  height: number
}

export interface LayerType {
  markers: MarkerType[]
  icon: IconType,
  minZoom?: number,
  maxZoom?: number,
  showLabelForZoomLevel?: number
}

export interface LocationType {
  name: string,
  layers: LayerType[]
  link?: string;
  source?: string,
}
