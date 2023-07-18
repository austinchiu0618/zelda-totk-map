import L from 'leaflet'
import { Marker } from 'react-leaflet'
import sky from '@/assets/markers/sky/locations.json'
import type { LayerType, LayoutType, LocationType, MarkerType } from '@/types'

type LocationMarksProps = {
  zoom: number,
  layout: LayoutType,
  selectItems: Set<string>
}

const locations:LocationType[] = sky

export default function SkyMarks(props: LocationMarksProps) {
  const { zoom, layout, selectItems } = props
  return (
    <div>
      {locations.filter((location) => {
        if (selectItems.has(location.name)) return location
        return null
      }).map((location) => (

        <div key={location.name}>
          {location.layers.filter((layer: LayerType) => {
            if (!layer.maxZoom && !layer.minZoom) return layer.markers

            const condition = (layer?.maxZoom ?? 6) >= zoom - 2 && zoom - 2 >= (layer.minZoom ?? 0)
            if (condition) return layer.markers
            return null
          }).map((layer) => (

            <div key={layer.icon.url}>

              {/* Dungeon */}
              {location.name === 'Dungeon' && layer.markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.coords[0], marker.coords[1]]}
                  icon={new L.Icon({
                    iconUrl: `src/assets/icons/${layer.icon.url}`,
                    iconSize: [layer.icon.width, layer.icon.height],
                    iconAnchor: [layer.icon.width / 2, layer.icon.height / 2]
                  })}
                />
              ))}

            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
