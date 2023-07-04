import icon from '@/constants/icon'
import type { LayoutType } from '@/types'

type LayerControlProps = {
  layout: LayoutType,
  setLayout: React.Dispatch<React.SetStateAction<LayoutType>>
}

export default function LayerControl(props: LayerControlProps) {
  const { layout, setLayout } = props

  const skyRef = useRef<HTMLImageElement>({} as HTMLImageElement)
  const surfaceRef = useRef<HTMLImageElement>({} as HTMLImageElement)
  const depthsRef = useRef<HTMLImageElement>({} as HTMLImageElement)

  useEffect(() => {
    skyRef.current.src = layout === 'sky' ? icon.skySelected : icon.sky
    surfaceRef.current.src = layout === 'surface' ? icon.surfaceSelected : icon.surface
    depthsRef.current.src = layout === 'depths' ? icon.depthsSelected : icon.depths
  }, [layout])

  return (
    <div className="flex flex-col gap-y-2.5 bg-black/50 p-1">
      {/* sky */}
      <div
        className="cursor-pointer"
        onClick={() => setLayout('sky')}
      >
        <img
          className="w-8 h-8"
          ref={skyRef}
          alt="skyIcon"
        />
      </div>

      {/* surface */}
      <div
        className="cursor-pointer"
        onClick={() => setLayout('surface')}
      >
        <img
          className="w-8 h-8"
          ref={surfaceRef}
          alt="surfaceIcon"
        />
      </div>

      {/* depths */}
      <div
        className="cursor-pointer"
        onClick={() => setLayout('depths')}
      >
        <img
          className="w-8 h-8"
          ref={depthsRef}
          alt="depthsIcon"
        />
      </div>
    </div>
  )
}
