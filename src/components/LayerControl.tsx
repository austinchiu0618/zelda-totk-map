import icon from '@/constants/icon'
import type { LayoutType } from '@/types'

type LayerControlProps = {
  layout: LayoutType;
  setLayout: React.Dispatch<React.SetStateAction<LayoutType>>;
};

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
    <div className="flex flex-col items-center gap-y-2">
      {/* sky */}
      <div
        className="icon-button"
        onClick={() => setLayout('sky')}>
        <img
          className="object-cover"
          ref={skyRef}
          alt="skyIcon" />
      </div>

      {/* surface */}
      <div
        className="icon-button"
        onClick={() => setLayout('surface')}>
        <img
          className="object-cover"
          ref={surfaceRef}
          alt="surfaceIcon" />
      </div>

      {/* depths */}
      <div
        className="icon-button"
        onClick={() => setLayout('depths')}>
        <img
          className="object-cover"
          ref={depthsRef}
          alt="depthsIcon" />
      </div>
    </div>
  )
}
