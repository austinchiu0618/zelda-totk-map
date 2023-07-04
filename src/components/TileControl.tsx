import L from 'leaflet'
import { LayersControl, Marker } from 'react-leaflet'

export default function TileControl() {
  return (
    <LayersControl
      position="topright"
      collapsed={false}
    >
      <LayersControl.Overlay
        name="abc"
      >
        <Marker position={[-1907.83105, -889.487976]} />
        <Marker
          attribution="color: red"
          position={[2232.06104, 1934.86499]}
          icon={L.divIcon({ html: '奧爾汀地區' })}
        />
      </LayersControl.Overlay>
    </LayersControl>
  )
}
