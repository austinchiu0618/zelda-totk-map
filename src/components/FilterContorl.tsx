export default function FilterContorl() {
  const [isShowFilter, setIsShowFilter] = useState(false)

  return (
    <div>
      <div
        className="icon-button"
        onClick={() => {
          setIsShowFilter(!isShowFilter)
        }}
      >
        <svg
          className={isShowFilter ? 'fill-yellow' : 'fill-white'}
          viewBox="0 0 1792 1792"
        >
          <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z" />
        </svg>
      </div>
      <div
        className={`absolute left-14 top-0 h-screen w-80 zelda-bg bg-[length:28%] ${
          isShowFilter ? 'block' : 'hidden'
        }`}
      >
        <div className="py-5 flex justify-around text-white text-lg ">
          <button type="button">搜尋</button>
          <button type="button">全選</button>
          <button type="button">清除</button>
        </div>
        <div>傳送點</div>
      </div>
    </div>
  )
}
