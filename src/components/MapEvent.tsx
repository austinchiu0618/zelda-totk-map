import { useMapEvents, useMap } from 'react-leaflet'

type MapEventProps = {
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

export default function MapEvent(props: MapEventProps) {
  const { setZoom } = props
  const [searchParams, setSearchParams] = useSearchParams()

  const map = useMap()
  useMapEvents({
    moveend: () => {
      setZoom(map.getZoom())
      setSearchParams({
        z: `${map.getZoom()}`,
        x: `${Math.trunc(map.getCenter().lat)}`,
        y: `${Math.trunc(map.getCenter().lng)}`
      })
    }
  })
  return null
}
