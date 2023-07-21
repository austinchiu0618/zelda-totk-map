export default function Navbar() {
  return (
    <div className="navbar w-full relative z-[999] flex justify-between h-12 items-center px-4">
      <div className="title flex items-center space-x-6 text-xl font-semibold text-yellow-light">
        <img
          className="w-12"
          src="src/assets/image/zelda.png"
          alt="zelda" />
        <span>薩爾達</span>
        <span>王國之淚地圖</span>
      </div>
      <div className="font-normal text-white">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            className="h-7"
            src="src/assets/image/language.svg"
            alt="language" />
          <span>language</span>
        </div>
      </div>
    </div>
  )
}
