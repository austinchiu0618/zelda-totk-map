import L from 'leaflet'
import { Marker } from 'react-leaflet'
import placeNameJson from '@/assets/markers/placeName.json'
import type { LayoutType, MarkerType, LayerType } from '@/types'

type LocationMarksProps = {
  zoom: number,
  layout: LayoutType
}

type PlaceNameJson = {[key in LayoutType]: {
  name: string,
  layers: Pick<LayerType, 'markers'|'maxZoom'|'minZoom'>[]
}}

const placeName:PlaceNameJson = placeNameJson

export default function PlaceNameMarks(props: LocationMarksProps) {
  const { zoom, layout } = props
  const [list, setList] = useState<MarkerType[]>([])

  const { t } = useTranslation()

  useEffect(() => {
    const newMarkers = placeName[layout].layers.map((elm) => {
      const condition = (elm.maxZoom ?? 6) >= zoom - 2 && zoom - 2 >= (elm.minZoom ?? 0)
      if (condition) return elm.markers
      return []
    })
    setList(newMarkers.flat())
  }, [zoom, layout])

  return (
    <div>
      {list.map((elm) => (
        <Marker
          key={elm.id}
          position={[elm.coords[0], elm.coords[1]]}
          icon={L.divIcon({ html: `<div class="locationName">${t(elm.name ?? '', { ns: 'totk' })}</div>` })}
        />
      ))}
    </div>
  )
}
