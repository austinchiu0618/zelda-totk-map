import categoryJson from '@/assets/markers/category.json'

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
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }

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
        className={`absolute left-14 top-0 h-full w-80 bg-black/90 ${
          isShowFilter ? 'block' : 'hidden'
        }`}>
        <div className="flex justify-around py-5 text-lg text-white">
          <button type="button">{t('search', { ns: 'totk' })}</button>
          <button type="button">{t('button-category-all', { ns: 'totk' })}</button>
          <button type="button">{t('button-category-clear', { ns: 'totk' })}</button>
        </div>
        <div
          style={{ overscrollBehavior: 'none' }}
          className="no-bar flex h-[calc(100vh-48px-68px)] flex-1 flex-col space-y-5 overflow-y-scroll px-3 pb-10">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col space-y-4">
              <div className="cursor-default text-xl text-yellow">
                {t(category.name, { ns: 'totk' })}
              </div>

              <div className="grid grid-cols-2 text-base text-white">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className={`cursor-pointer py-2.5 ${selectItems.has(item.name) && 'bg-white/10'}`}
                    onClick={() => {
                      selectHandle(item.name)
                    }}>
                    {t(item.name, { ns: 'totk' })}
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
