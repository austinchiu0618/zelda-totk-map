import L from 'leaflet'
import { LayersControl, Marker } from 'react-leaflet'

export default function TileControl() {
  return (
    <LayersControl
      position="topright"
      collapsed={false}
    >
      <LayersControl.Overlay
        name="aaa"
      >
        <Marker position={[-1907.83105, -889.487976]} />
      </LayersControl.Overlay>
    </LayersControl>
  )
}
