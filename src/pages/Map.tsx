import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
// import icon from '@/constants/icon'
// Style
import '@/styles/style.css'
import 'leaflet/dist/leaflet.css'
// component
import LayerControl from '@/components/LayerControl'
import TileControl from '@/components/TileControl'
// type
import type { LayoutType } from '@/types'

const mapStyle = { backgroundColor: '#000' }

// Set init value
const lat = 117.2 // Lat 緯度
const lng = 140.63 // Lng 經度
const ratio = 3 / 256
const southWest = new L.LatLng((lat / 2) / ratio, (lng / 2) / ratio)
const northEast = new L.LatLng(-(lat / 2) / ratio, -(lng / 2) / ratio)
const bounds = new L.LatLngBounds(southWest, northEast)
const url = 'https://raw.githubusercontent.com/Slluxx/TOTK-Interactive-Map/tiles/assets/tiles'

const zeldaCRS = L.extend(
  {},
  L.CRS.Simple,
  { transformation: new L.Transformation(ratio, (lng / 2), -ratio, (lat / 2)) }
)

axios.get('./src/assets/markers/groundtiles/locations.json').then(async (res) => {
  console.log(await res.data)
})

export default function Map() {
  // Init Map
  const center = new L.LatLng(0, 0)
  const [zoom, setZoom] = useState(4)
  const [layout, setLayout] = useState<LayoutType>('groundtiles')

  // const [searchParams, setSearchParams] = useSearchParams()
  // useEffect(() => {
  //   setSearchParams({ zoom: '4', x: '-1907.83105', y: '-889.487976' })
  //   console.log(searchParams)
  // }, [])
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
        url={`${url}/${layout}/{z}/{x}/{y}.png`}
      />

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
      <TileControl />
    </MapContainer>
  )
}
