import icon from '@/constants/icon'
import type { LayoutType } from '@/types'

type LayerControlProps = {
  layout: string,
  setLayout: React.Dispatch<React.SetStateAction<LayoutType>>
}

export default function LayerControl(props: LayerControlProps) {
  const { layout, setLayout } = props

  const skyRef = useRef<HTMLImageElement>({} as HTMLImageElement)
  const groundRef = useRef<HTMLImageElement>({} as HTMLImageElement)
  const undergroundRef = useRef<HTMLImageElement>({} as HTMLImageElement)

  useEffect(() => {
    skyRef.current.src = layout === 'skytiles' ? icon.skySelected : icon.sky
    groundRef.current.src = layout === 'groundtiles' ? icon.surfaceSelected : icon.surface
    undergroundRef.current.src = layout === 'undergroundtiles' ? icon.depthsSelected : icon.depths
  }, [layout])

  return (
    <div className="flex flex-col gap-y-2.5 bg-black/50 p-1">
      {/* skytiles */}
      <div
        className="cursor-pointer"
        onClick={() => setLayout('skytiles')}
      >
        <img
          className="w-8 h-8"
          ref={skyRef}
          alt="skyIcon"
        />
      </div>

      {/* groundtiles */}
      <div
        className="cursor-pointer"
        onClick={() => setLayout('groundtiles')}
      >
        <img
          className="w-8 h-8"
          ref={groundRef}
          alt="surfaceIcon"
        />
      </div>

      {/* undergroundtiles */}
      <div
        className="cursor-pointer"
        onClick={() => setLayout('undergroundtiles')}
      >
        <img
          className="w-8 h-8"
          ref={undergroundRef}
          alt="depthsIcon"
        />
      </div>
    </div>
  )
}
