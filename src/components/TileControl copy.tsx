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
        <Marker
          position={[2232.06104, 1934.86499]}
          icon={L.divIcon({
            html: 'aaaa'
          })}
        >
          <div>abc</div>
        </Marker>
      </LayersControl.Overlay>
    </LayersControl>
  )
}
