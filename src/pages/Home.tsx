import Map from '@/pages/Map'

export default function Home() {
  return (
    <div>
      <div
        className="title relative z-[999] flex h-12 items-center space-x-6 px-4 text-xl font-semibold  text-yellow-light">
        <img
          className="w-12"
          src="src/assets/image/zelda.png"
          alt="zelda" />
        <span>薩爾達</span>
        <span>王國之淚地圖</span>
      </div>
      <Map />
    </div>
  )
}
