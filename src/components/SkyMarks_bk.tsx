import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import sky from '@/assets/json/sky/locations.json'
import type { LayerType, LocationType, MarkerType, IconType } from '@/types'

type LocationMarksProps = {
  zoom: number,
  selectItems: Set<string>
}

function LoaclMarker({ marker, icon }: {marker:MarkerType, icon:IconType}) {
  const { t } = useTranslation()
  return (
    <Marker
      key={marker.id}
      position={[marker.coords[0], marker.coords[1]]}
      icon={new L.Icon({
        iconUrl: `src/assets/icons/${icon.url}`,
        iconSize: [icon.width, icon.height],
        iconAnchor: [icon.width / 2, icon.height / 2],
        className: icon.url.replaceAll('.', '_')
      })}>
      <Popup>
        <div>{marker.name && t(marker.name, { ns: 'totk' })}</div>
        <div>
          <span>{Math.floor(marker.coords[0])}</span>
          {' '}
          <span>{Math.floor(marker.coords[1])}</span>
          {' '}
          <span>{Math.floor(marker.elv)}</span>
        </div>
      </Popup>
    </Marker>
  )
}

const markerType01 = [
  'Dungeon', 'Shrine of Light',
  'Device Dispenser', 'Zonai Relief',
  'General Store', 'Other Shops',
  'Cave', 'Other Travel Gates',
  'Cooking Pot'
]

// no name, no link
const markerType02 = [
  'Cooking Pot'
]

export default function SkyMarks(props: LocationMarksProps) {
  const { zoom, selectItems } = props

  const locations:LocationType[] = selectItems.has('all')
    ? sky
    : sky.filter(
      (location) => selectItems.has(location.name)
    )

  return (
    <div>
      {locations.map((location) => (

        <div key={location.name}>
          {location.layers.filter((layer: LayerType) => {
            if (!layer.maxZoom && !layer.minZoom) return true
            if ((layer?.maxZoom ?? 6) >= zoom - 2 && zoom - 2 >= (layer.minZoom ?? 0)) return true
            return false
          }).map((layer) => (

            <div key={layer.icon.url}>
              {/* markerType01 */}
              {markerType01.includes(location.name) && layer.markers.map((marker) => (
                <LoaclMarker
                  key={marker.id}
                  marker={marker}
                  icon={layer.icon} />
              ))}

            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
