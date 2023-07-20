import categoryJson from '@/assets/json/category.json'

type PropsType = {
  selectItems: Set<string>;
  setSelectItems: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const categories = categoryJson

export default function FilterContorl(props: PropsType) {
  const { selectItems, setSelectItems } = props
  const [isShowFilter, setIsShowFilter] = useState(true)

  const { t } = useTranslation()

  const selectHandle = (name: string) => {
    setSelectItems((prev) => {
      if (prev.has('all')) prev.clear()
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }

      return next
    })
  }
  const selectAllHandle = () => {
    setSelectItems((prev) => {
      prev.clear()
      const next = new Set(['all'])

      return next
    })
  }
  const clearHandle = () => {
    setSelectItems((prev) => {
      prev.clear()
      const next = new Set([])

      return next
    })
  }

  return (
    <div>
      <div
        className="icon-button"
        onClick={() => {
          setIsShowFilter(!isShowFilter)
        }}>
        <svg
          className={isShowFilter ? 'fill-yellow' : 'fill-white'}
          viewBox="0 0 1792 1792">
          <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z" />
        </svg>
      </div>

      {/* 展開 */}
      <div
        className={`absolute left-14 top-0 h-full w-[360px] bg-black ${
          isShowFilter ? 'block' : 'hidden'
        }`}>
        <div className="flex justify-around space-x-1 py-2 text-lg text-white">
          <button
            className="w-full py-3 hover:bg-white/30"
            type="button">
            {t('search', { ns: 'totk' })}
          </button>
          <button
            className="w-full hover:bg-white/30"
            type="button"
            onClick={() => selectAllHandle()}>
            {t('button-category-all', { ns: 'totk' })}
          </button>
          <button
            className="w-full hover:bg-white/30"
            type="button"
            onClick={() => clearHandle()}>
            {t('button-category-clear', { ns: 'totk' })}
          </button>
        </div>

        <div className="no-bar flex h-[calc(100vh-48px-68px)] flex-1 flex-col space-y-6 overflow-y-scroll px-4 pb-10">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col space-y-2">
              <div className="cursor-default text-xl text-yellow">
                {t(category.name, { ns: 'totk' })}
              </div>

              <div className="grid grid-cols-2 gap-0.5 text-base text-white">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center cursor-pointer space-x-2.5 px-2 py-2.5 ${
                      (selectItems.has(item.name) || selectItems.has('all')) && 'bg-white/10'
                    }`}
                    onClick={() => {
                      selectHandle(item.name)
                    }}>
                    <img
                      className="h-[28px] w-[28px]"
                      src={`src/assets/icons/${item.icon}`}
                      alt="icon" />
                    <span>{t(item.name, { ns: 'totk' })}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
