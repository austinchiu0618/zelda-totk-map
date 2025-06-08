type Props = {
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

export default function ZoomControl(props: Props) {
  const { zoom, setZoom } = props

  return (
    <div className="flex flex-col items-center gap-y-2">

      <button
        type="button"
        className="icon-button"
        disabled={zoom === 8}
        onClick={() => setZoom(zoom + 1)}>
        <svg
          className={zoom === 8 ? 'fill-gray-600' : 'fill-white'}
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="AddIcon">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </button>

      <button
        type="button"
        className="icon-button"
        disabled={zoom === 3}
        onClick={() => setZoom(zoom - 1)}>
        <svg
          className={zoom === 3 ? 'fill-gray-600' : 'fill-white'}
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="RemoveIcon">
          <path d="M19 13H5v-2h14v2z" />
        </svg>
      </button>
    </div>
  )
}
