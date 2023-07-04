import L from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

// Style
import '@/styles/style.css'
import 'leaflet/dist/leaflet.css'

// component
import MapEvent from '@/components/MapEvent'
import FilterContorl from '@/components/FilterContorl'
import LayerControl from '@/components/LayerControl'
import ZoomControl from '@/components/ZoomContorl'
import PlaceNameMarks from '@/components/PlaceNameMarks'
// type
import type { LayoutType } from '@/types'

const mapStyle = { backgroundColor: '#202b2d' }

// Set init value
const lat = 117.2 // Lat 緯度
const lng = 140.63 // Lng 經度
const ratio = 3 / 256
const southWest = new L.LatLng(lat / 2 / ratio, lng / 2 / ratio)
const northEast = new L.LatLng(-(lat / 2) / ratio, -(lng / 2) / ratio)
const bounds = new L.LatLngBounds(southWest, northEast)
// const tileUrl = 'https://raw.githubusercontent.com/Slluxx/TOTK-Interactive-Map/tiles/assets/tiles'

const zeldaCRS = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(ratio, lng / 2, -ratio, lat / 2)
})

const myUrl = new URL(window.location.href)
const z = myUrl.searchParams.has('z') ? Number(myUrl.searchParams.get('z')) : 4
const x = myUrl.searchParams.has('x') ? Number(myUrl.searchParams.get('x')) : 0
const y = myUrl.searchParams.has('y') ? Number(myUrl.searchParams.get('y')) : 0

export default function Map() {
  // Init Map
  const center = new L.LatLng(x, y)
  const [zoom, setZoom] = useState(z)
  const [layout, setLayout] = useState<LayoutType>('surface')

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({
      z: `${z}`,
      x: `${x}`,
      y: `${y}`
    })
  }, [])

  return (
    <MapContainer
      id="map"
      style={mapStyle}
      crs={zeldaCRS}
      center={center}
      zoom={zoom}
      zoomControl={false}
      attributionControl={false}
      minZoom={3}
      maxZoom={8}
      maxBounds={bounds}
    >

      {/* 事件控制 */}
      <MapEvent setZoom={setZoom} />

      {/* 控制面板 */}
      <div className="leaflet-top leaflet-left">
        <div
          className="leaflet-control !m-0 flex h-screen flex-col justify-center gap-y-10 bg-black/80"
        >
          <FilterContorl />
          <LayerControl
            setLayout={setLayout}
            layout={layout}
          />
          <ZoomControl />
        </div>
      </div>

      {/* Markers */}
      <PlaceNameMarks
        zoom={zoom}
        layout={layout}
      />

      {/* 地圖 */}
      <TileLayer
        bounds={bounds}
        noWrap
        tms
        url={`src/assets/tiles/${layout}/{z}/{x}/{y}.png`}
      />
    </MapContainer>
  )
}
