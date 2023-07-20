export type LayoutType = 'sky' | 'surface' | 'depths'
export type zoom = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'

export interface MarkerType {
  coords: number[];
  elv: number;
  id: string;
  name?: string;
  link?: string;
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
  minZoom?: number,
  maxZoom?: number,
  showLabelForZoomLevel?: number
  icon: IconType,
  markers: MarkerType[]
}

export interface LocationType {
  name: string,
  link?: string;
  source?: string,
  layers: LayerType[]
}
