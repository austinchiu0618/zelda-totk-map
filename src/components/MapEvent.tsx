import { useMapEvents, useMap } from 'react-leaflet'
import { LayoutType } from '@/types'

type MapEventProps = {
  layout: LayoutType
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

export default function MapEvent(props: MapEventProps) {
  const { layout, setZoom } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const map = useMap()

  useMapEvents({
    moveend: () => {
      setZoom(map.getZoom())
      setSearchParams({
        x: `${Math.trunc(map.getCenter().lat)}`,
        y: `${Math.trunc(map.getCenter().lng)}`,
        z: `${map.getZoom()}`,
        i: layout
      })
    }
  })
  return null
}
