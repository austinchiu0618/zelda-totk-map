import L from 'leaflet'
import { Rectangle } from 'react-leaflet'

export default function MyMap() {
  const lat = 117.2
  const lng = 140.63
  const ratio = 3 / 256
  const southWest = new L.LatLng((lat / 2) / ratio, (lng / 2) / ratio)
  const northEast = new L.LatLng(-(lat / 2) / ratio, -(lng / 2) / ratio)
  const bounds = new L.LatLngBounds(southWest, northEast)
  return (
    <Rectangle
      bounds={bounds}
      pathOptions={{
        color: '#fff', fill: false
      }}
    />
  )
}
