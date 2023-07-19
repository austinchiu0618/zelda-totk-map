import { useMapEvents, useMap } from 'react-leaflet'

type MapEventProps = {
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

export default function MapEvent(props: MapEventProps) {
  const { zoom, setZoom } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const map = useMap()

  useEffect(() => {
    if (map.getZoom() === zoom) return
    map.setZoom(zoom)
  }, [zoom])

  useMapEvents({
    moveend: () => {
      setZoom(map.getZoom())
      setSearchParams({
        x: `${Math.trunc(map.getCenter().lat)}`,
        y: `${Math.trunc(map.getCenter().lng)}`,
        z: `${map.getZoom()}`,
        i: `${searchParams.get('i')}`
      })
    }
  })
  return null
}
