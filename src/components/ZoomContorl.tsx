import { useMap } from 'react-leaflet'

export default function ZoomControl() {
  const map = useMap()

  return (
    <div className="flex flex-col items-center gap-y-2">

      <div
        className="icon-button"
        onClick={() => map.setZoom(map.getZoom() + 1)}
      >
        <svg
          className={map.getZoom() === 8 ? ' fill-gray-600' : 'fill-white'}
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="AddIcon"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </div>

      <div
        className="icon-button"
        onClick={() => map.setZoom(map.getZoom() - 1)}
      >
        <svg
          className={map.getZoom() === 3 ? ' fill-gray-600' : 'fill-white'}
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="RemoveIcon"
        >
          <path d="M19 13H5v-2h14v2z" />
        </svg>
      </div>
    </div>
  )
}
