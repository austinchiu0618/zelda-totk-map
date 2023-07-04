import L from 'leaflet'
import { Marker } from 'react-leaflet'
import skyPlaceName from '@/assets/markers/sky/placeName.json'
import surfacePlaceName from '@/assets/markers/surface/placeName.json'
import depthsPlaceName from '@/assets/markers/depths/placeName.json'
import type { LayoutType } from '@/types'

type LocationMarksProps = {
  zoom: number,
  layout: LayoutType
}

type MarkerType = {
  coords: number[];
  elv: number;
  id: string;
  name: string;
  link: string;
}

export default function LocationControl(props: LocationMarksProps) {
  const { zoom, layout } = props
  const [markerDate, setMarkerDate] = useState(surfacePlaceName.layers)
  const [list, setList] = useState<MarkerType[]>([])

  useEffect(() => {
    const newMarkers = markerDate.map((elm) => {
      const condition = (elm.maxZoom ?? 6) >= zoom - 2 && zoom - 2 >= elm.minZoom
      if (condition) {
        return elm.markers
      }
      return []
    })
    setList(newMarkers.flat())
  }, [zoom, markerDate])

  useEffect(() => {
    switch (layout) {
      case 'sky':
        setMarkerDate(skyPlaceName.layers)
        break
      case 'surface':
        setMarkerDate(surfacePlaceName.layers)
        break
      case 'depths':
        setMarkerDate(depthsPlaceName.layers)
        break
      default:
        break
    }
  }, [layout])

  return (
    <div>
      {list.map((elm) => (
        <Marker
          key={elm.id}
          position={[elm.coords[0], elm.coords[1]]}
          icon={L.divIcon({ html: `<div class="locationName">${elm.name}</div>` })}
        />
      ))}
    </div>
  )
}
