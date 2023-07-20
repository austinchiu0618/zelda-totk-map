import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import sky from '@/assets/json/sky/locations.json'
import { LayerType, LocationType, MarkerType, IconType } from '@/types'

type LocationMarksProps = {
  zoom: number;
  selectItems: Set<string>;
};

interface FilterLayerType extends LayerType {
  location: string
}

// component
function LoaclMarker({ marker, icon, location }: { marker: MarkerType; icon: IconType; location:string}) {
  const { t } = useTranslation()
  return (
    <Marker
      key={marker.id}
      position={[marker.coords[0], marker.coords[1]]}
      icon={
        new L.Icon({
          iconUrl: `src/assets/icons/${icon.url}`,
          iconSize: [icon.width, icon.height],
          iconAnchor: [icon.width / 2, icon.height / 2],
          className: icon.url.replaceAll('.', '_')
        })
      }>
      <Popup>
        <div>{t(marker.name ?? location, { ns: 'totk' })}</div>
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

// Math
function filterLocation(locations: LocationType[], selectItems:Set<string>, zoom: number) {
  const arr:FilterLayerType[] = []
  if (selectItems.has('all')) {
    locations.forEach((location) => {
      location.layers.forEach((layer) => {
        const condition1 = !layer.maxZoom && !layer.minZoom
        const condition2 = (layer?.maxZoom ?? 6) >= zoom - 2 && zoom - 2 >= (layer.minZoom ?? 0)
        if (condition1 || condition2) arr.push({ location: location.name, ...layer })
      })
    })
  } else {
    locations.forEach((location) => {
      if (!selectItems.has(location.name)) return
      location.layers.forEach((layer) => {
        arr.push({ location: location.name, ...layer })
      })
    })
  }
  return arr
}

export default function SkyMarks(props: LocationMarksProps) {
  const { zoom, selectItems } = props
  const layers: FilterLayerType[] = filterLocation(sky, selectItems, zoom)

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
