export type LayoutType = 'sky' | 'surface' | 'depths'

export type MarkerType = {
  coords: number[];
  elv: number;
  id: string;
  name?: string;
  link?: string;
}

export type IconType = {
  url: string,
  width: number,
  height: number
}

export type LayerType = {
  minZoom?: number,
  maxZoom?: number,
  showLabelForZoomLevel?: number
  icon: IconType,
  markers: MarkerType[]
}

export type LocationType = {
  name: string,
  link?: string;
  source: string,
  layers: LayerType[]
}
