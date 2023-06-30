import { useMapEvents, useMap } from 'react-leaflet'

export default function MapEvent() {
  const map = useMap()
  const [searchParams, setSearchParams] = useSearchParams()
  const mapEvens = useMapEvents({
    zoomend: () => {
      console.log('zoom', map.getZoom())
    },
    moveend: () => {
      console.log('zoom', map.getCenter())
    }
  })
  return null
}
