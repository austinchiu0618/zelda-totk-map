import L from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
// Style
import '@/styles/style.css'
import 'leaflet/dist/leaflet.css'

// component
import MapEvent from '@/components/MapEvent'
import FilterContorl from '@/components/FilterContorl'
import LayerControl from '@/components/LayerControl'
import ZoomControl from '@/components/ZoomContorl'
import PlaceNameMarks from '@/components/PlaceNameMarks'
import SkyMarks from '@/components/SkyMarks'
// type
import type { LayoutType } from '@/types'

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
const i = myUrl.searchParams.has('i') ? myUrl.searchParams.get('i') as LayoutType : 'surface'

export default function Map() {
  // Init Map
  const center = new L.LatLng(x, y)
  const [zoom, setZoom] = useState(z)
  const [layout, setLayout] = useState<LayoutType>(i)

  const [selectItems, setSelectItems] = useState<Set<string>>(new Set())

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({
      x: `${x}`,
      y: `${y}`,
      z: `${z}`,
      i: layout
    })
  }, [])

  useEffect(() => {
    setSearchParams({
      x: `${x}`,
      y: `${y}`,
      z: `${z}`,
      i: layout
    })
  }, [layout])

  return (
    <MapContainer
      id="map"
      crs={zeldaCRS}
      center={center}
      zoom={zoom}
      zoomControl={false}
      attributionControl={false}
      minZoom={2}
      maxZoom={8}
      maxBounds={bounds}
    >
      {/* 事件控制 */}
      <MapEvent
        setZoom={setZoom}
        layout={layout}
      />

      {/* 控制面板 */}
      <div
        onDoubleClickCapture={(e) => {
          e.stopPropagation()
        }}
        className="leaflet-top leaflet-left"
      >
        <div className="leaflet-control zelda-bg bg-[length:140%] !m-0 flex h-screen flex-col justify-center gap-y-10">
          <FilterContorl
            setSelectItems={setSelectItems}
          />
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

      {/* {layout === 'surface' && (
        <SurfaceMarks
          zoom={zoom}
          layout={layout}
        />
      )} */}

      <SkyMarks
        selectItems={selectItems}
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
