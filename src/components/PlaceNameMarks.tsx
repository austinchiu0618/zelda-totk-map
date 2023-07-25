import L from 'leaflet'
import { Marker } from 'react-leaflet'
import placeNameJson from '@/assets/json/placeName.json'
import type { LayoutType, LayerType } from '@/types'

type LocationMarksProps = {
  zoom: number,
  layout: LayoutType
}

// eslint-disable-next-line
type PlaceNameJson = {[key in LayoutType]: {
  name: string,
  layers: Pick<LayerType, 'markers'|'maxZoom'|'minZoom'>[]
}}

const placeName:PlaceNameJson = placeNameJson

export default function PlaceNameMarks(props: LocationMarksProps) {
  const { zoom, layout } = props
  const { t } = useTranslation()

  return (
    <div>
      {placeName[layout].layers.flatMap((layer) => {
        const condition = (layer.maxZoom ?? 6) >= zoom - 2 && zoom - 2 >= (layer.minZoom ?? 0)
        if (condition) return layer.markers
        return []
      }).map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.coords[0], marker.coords[1]]}
          icon={L.divIcon({ html: `<div class="locationName">${t(marker.name ?? '', { ns: 'totk' })}</div>` })} />
      ))}
    </div>
  )
}
