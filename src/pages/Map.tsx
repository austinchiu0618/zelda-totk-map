import L from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import { MapEvent,
  FilterContorl,
  LayerControl,
  ZoomControl,
  PlaceNameMarks,
  LocationMarks } from '@/constants/component'

import type { LayoutType } from '@/types'

// Set init value
const lat = 117.2 // Lat 緯度
const lng = 140.63 // Lng 經度
const ratio = 3 / 256
const southWest = new L.LatLng(lat / 2 / ratio, lng / 2 / ratio)
const northEast = new L.LatLng(-(lat / 2) / ratio, -(lng / 2) / ratio)
const bounds = new L.LatLngBounds(southWest, northEast)
// const tileUrl = 'src/assets/tiles'
const tileUrl = 'https://raw.githubusercontent.com/austinchiu0618/zelda-totk-map-tiles/main'

const zeldaCRS = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(ratio, lng / 2, -ratio, lat / 2)
})

const myUrl = new URL(window.location.href)
const z = myUrl.searchParams.has('z') ? Number(myUrl.searchParams.get('z')) : 4
const x = myUrl.searchParams.has('x') ? Number(myUrl.searchParams.get('x')) : 0
const y = myUrl.searchParams.has('y') ? Number(myUrl.searchParams.get('y')) : 0
const i = myUrl.searchParams.has('i') ? (myUrl.searchParams.get('i') as LayoutType) : 'surface'
const center = new L.LatLng(x, y)

export default function Map() {
  // Init Map
  const [zoom, setZoom] = useState(z)
  const [layout, setLayout] = useState<LayoutType>(i)

  const [selectItems, setSelectItems] = useState<Set<string>>(new Set())

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({
      x: `${searchParams.get('x') ?? x}`,
      y: `${searchParams.get('y') ?? y}`,
      z: `${searchParams.get('z') ?? z}`,
      i: layout
    })
  }, [layout])

  return (
    <div className="relative z-0 h-[calc(100vh-48px)]">
      {/* 控制面板 */}
      <div className="leaflet-top leaflet-left h-full">
        <div className="leaflet-control zelda-bg !m-0 flex h-full flex-col justify-center gap-y-12 bg-[length:140%]">
          <FilterContorl
            setSelectItems={setSelectItems}
            selectItems={selectItems} />
          <LayerControl
            setLayout={setLayout}
            layout={layout} />
          <ZoomControl
            zoom={zoom}
            setZoom={setZoom} />
        </div>
      </div>

      {/* 地圖  'maxBounds={bounds} 地圖會回到中心' */}
      <MapContainer
        id="map"
        crs={zeldaCRS}
        center={center}
        zoom={zoom}
        zoomControl={false}
        attributionControl={false}
        minZoom={2}
        maxZoom={8}>
        <TileLayer
          bounds={bounds}
          noWrap
          tms
          url={`${tileUrl}/${layout}/{z}/{x}/{y}.png`} />

        {/* Markers */}
        <PlaceNameMarks
          zoom={zoom}
          layout={layout} />

        {!(selectItems.size === 0) && (
        <LocationMarks
          selectItems={selectItems}
          zoom={zoom}
          layout={layout} />
        )}

        {/* 事件控制 */}
        <MapEvent
          zoom={zoom}
          setZoom={setZoom} />
      </MapContainer>
    </div>
  )
}
