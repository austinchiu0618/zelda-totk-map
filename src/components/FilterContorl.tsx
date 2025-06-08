import categoryJson from '@/assets/json/category.json'

type FilterContorlProps = {
  selectItems: Set<string>;
  setSelectItems: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const categories = categoryJson

function CategoryGroup(props: {
  category: { name: string; items: { name: string; icon: string }[] };
  filterProp: FilterContorlProps;
}) {
  const { category, filterProp } = props
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const [isShow, setIsShow] = useState(false)

  const selectHandle = (name: string) => {
    filterProp.setSelectItems((prev) => {
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

  return (
    <div className="flex flex-col space-y-2">
      <div
        onClick={() => {
          setIsShow(!isShow)
        }}
        className="flex cursor-pointer items-center justify-between px-2 text-xl text-yellow">
        <span>{t(category.name, { ns: 'totk' })}</span>
        <img
          className={`mr-2 ${!isShow && 'rotate-180'}`}
          src="/assets/image/arrow.svg"
          alt="arrow" />
      </div>

      <div
        className={`grid grid-cols-2 gap-0.5 overflow-hidden text-base text-white transition-[height] ease-in-out duration-300 ${
          isShow ? 'h-0' : 'h-full'
        }`}>
        {category.items.map((item) => (
          <div
            key={item.name}
            className={`flex cursor-pointer items-center space-x-2 py-2 pl-2 ${
              (filterProp.selectItems.has(item.name) || filterProp.selectItems.has('all'))
              && 'bg-white/10'
            }`}
            onClick={() => {
              selectHandle(item.name)
            }}>
            <img
              className="h-[28px] w-[28px]"
              src={`/assets/icons/${item.icon}`}
              alt="icon" />
            <span
              className={`${
                lang === 'ja' && t(item.name, { ns: 'totk' }).length > 7 && 'text-[13px]'
              } ${lang === 'en' && t(item.name, { ns: 'totk' }).length > 15 && 'text-[15px]'}`}>
              {t(item.name, { ns: 'totk' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FilterContorl(props: FilterContorlProps) {
  const { selectItems, setSelectItems } = props
  const [isShowFilter, setIsShowFilter] = useState(true)

  const { t } = useTranslation()

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
        className={`absolute left-14 top-0 h-full w-[380px] bg-black ${
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

        <div className="no-bar flex h-[calc(100vh-48px-68px)] flex-1 flex-col space-y-6 overflow-y-scroll px-3 pb-10">
          {categories.map((category) => (
            <CategoryGroup
              key={category.name}
              category={category}
              filterProp={props} />
          ))}
        </div>
      </div>
    </div>
  )
}
