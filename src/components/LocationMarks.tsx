import L from 'leaflet'
import { useLocalStorage } from 'react-use'
import { Marker, Popup, Polyline } from 'react-leaflet'
import { locations, quests } from '@/constants/json'
import { LayerType, LocationType, MarkerType, IconType, LayoutType } from '@/types'

interface FilterLayerType extends LayerType {
  location: string
}

const local = localStorage.getItem('selectedMarker')
const localData:Set<string> = local ? new Set(JSON.parse(local)) : new Set()

// component
function LoaclMarker({ marker, icon, location }: { marker: MarkerType; icon: IconType; location:string}) {
  const { t } = useTranslation()
  const [isSelected, setIsSelected] = useState<boolean>(localData.has(marker.id))

  return (
    <Marker
      key={marker.id}
      position={[marker.coords[0], marker.coords[1]]}
      icon={
        new L.Icon({
          iconUrl: `/assets/icons/${icon.url}`,
          iconSize: [icon.width, icon.height],
          iconAnchor: [icon.width / 2, icon.height / 2],
          className: `${icon.url.replaceAll('.', '_')} ${isSelected && 'isSelected'}`
        })
      }>

      <Popup>
        <div className="flex flex-col items-center">
          <div className="text-base font-semibold mb-1.5">{t(marker.name ?? location, { ns: 'totk' })}</div>
          <div className="text-sm mb-2">
            <span>{Math.floor(marker.coords[0])}</span>
            {' , '}
            <span>{Math.floor(marker.coords[1])}</span>
            {' , '}
            <span>{Math.floor(marker.elv)}</span>
          </div>
          <div
            className={`text-center cursor-pointer ${
              isSelected ? 'fill-black' : 'fill-gray-300'
            }`}
            onClick={() => {
              const newLocal = localStorage.getItem('selectedMarker')
              const newLocalData:Set<string> = newLocal ? new Set(JSON.parse(newLocal)) : new Set()
              if (!isSelected) {
                newLocalData.add(marker.id)
                setIsSelected(!isSelected)
              } else {
                newLocalData.delete(marker.id)
                setIsSelected(!isSelected)
              }
              localStorage.setItem('selectedMarker', JSON.stringify(Array.from(newLocalData)))
            }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path
                d="M21.855 10.303c.086.554.145 1.118.145 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.348 0 4.518.741 6.304 1.993l-1.421 1.457c-1.408-.913-3.083-1.45-4.883-1.45-4.963 0-9 4.038-9 9s4.037 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.865-1.902zm-.951-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z" />
            </svg>
          </div>
        </div>
      </Popup>

      {!!(marker.path) && (
      <Polyline
        positions={[[marker.path[0][0], marker.path[0][1]], [marker.path[1][0], marker.path[1][1]]]}
        pathOptions={{ color: 'white' }} />
      )}
    </Marker>
  )
}

// Math
function filterMarker(date: LocationType[], selectItems:Set<string>, zoom: number) {
  const arr:FilterLayerType[] = []
  if (selectItems.has('all')) {
    date.forEach((location) => {
      location.layers.forEach((layer) => {
        const condition1 = !layer.maxZoom && !layer.minZoom
        const condition2 = (layer?.maxZoom ?? 6) >= zoom - 2 && zoom - 2 >= (layer.minZoom ?? 0)
        if (condition1 || condition2) arr.push({ location: location.name, ...layer })
      })
    })
  } else {
    date.forEach((location) => {
      if (!selectItems.has(location.name)) return
      location.layers.forEach((layer) => {
        arr.push({ location: location.name, ...layer })
      })
    })
  }
  return arr
}

export default function SkyMarks(props: {
  zoom: number;
  layout: LayoutType;
  selectItems: Set<string>;
}) {
  const { zoom, layout, selectItems } = props
  const layers: FilterLayerType[] = filterMarker([...locations[layout], ...quests[layout]], selectItems, zoom)

  return (
    <div>
      {layers.map((layer) => (
        <div key={layer.icon.url}>
          {layer.markers.map((marker) => (
            <LoaclMarker
              key={marker.id}
              location={layer.location}
              marker={marker}
              icon={layer.icon} />
          ))}
        </div>
      ))}
    </div>
  )
}
