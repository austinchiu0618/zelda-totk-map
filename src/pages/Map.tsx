import L from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

// Style
import '@/styles/style.css'
import 'leaflet/dist/leaflet.css'

// component
import MapEvent from '@/components/MapEvent'
import LayerControl from '@/components/LayerControl'
import PlaceNameMarks from '@/components/PlaceNameMarks'

// type
import type { LayoutType } from '@/types'

const mapStyle = { backgroundColor: '#202b2d' }

// Set init value
const lat = 117.2 // Lat 緯度
const lng = 140.63 // Lng 經度
const ratio = 3 / 256
const southWest = new L.LatLng((lat / 2) / ratio, (lng / 2) / ratio)
const northEast = new L.LatLng(-(lat / 2) / ratio, -(lng / 2) / ratio)
const bounds = new L.LatLngBounds(southWest, northEast)
const tileUrl = 'https://raw.githubusercontent.com/Slluxx/TOTK-Interactive-Map/tiles/assets/tiles'

const zeldaCRS = L.extend(
  {},
  L.CRS.Simple,
  { transformation: new L.Transformation(ratio, (lng / 2), -ratio, (lat / 2)) }
)

const myUrl = new URL(window.location.href)
const z = myUrl.searchParams.has('z') ? Number(myUrl.searchParams.get('z')) : 4
const x = myUrl.searchParams.has('x') ? Number(myUrl.searchParams.get('x')) : 0
const y = myUrl.searchParams.has('y') ? Number(myUrl.searchParams.get('y')) : 0

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Init Map
  const center = new L.LatLng(x, y)
  const [zoom, setZoom] = useState(z)
  const [layout, setLayout] = useState<LayoutType>('surface')

  useEffect(() => {
    // console.log('useEffect')
    setSearchParams({
      z: `${z}`, x: `${x}`, y: `${y}`
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
      <TileLayer
        bounds={bounds}
        noWrap
        tms
        url={`src/assets/tiles/${layout}/{z}/{x}/{y}.png`}
      />

      <MapEvent setZoom={setZoom} />

      {/* 左上 */}
      <div className="leaflet-top leaflet-left">
        <div className="leaflet-control flex flex-col gap-y-2.5">
          <LayerControl
            setLayout={setLayout}
            layout={layout}
          />
        </div>
      </div>

      {/* 右上 */}
      {/* <div className="leaflet-top leaflet-right">
        <div className="leaflet-control flex flex-col gap-y-2.5" />
      </div> */}

      <PlaceNameMarks
        zoom={zoom}
        layout={layout}
      />

    </MapContainer>
  )
}
