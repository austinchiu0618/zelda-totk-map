import categoryJson from '@/assets/markers/category.json'

type PropsType = {
  setSelectItems: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const categories = categoryJson

export default function FilterContorl(props:PropsType) {
  const { setSelectItems } = props
  const [isShowFilter, setIsShowFilter] = useState(false)

  const { t } = useTranslation()

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
        className={`absolute left-14 top-0 h-screen w-80 zelda-bg bg-[length:28%] px-3 ${
          isShowFilter ? 'block' : 'hidden'
        }`}
      >
        <div className="py-5 flex justify-around text-white text-lg">
          <button type="button">{t('search', { ns: 'totk' })}</button>
          <button type="button">{t('button-category-all', { ns: 'totk' })}</button>
          <button type="button">{t('button-category-clear', { ns: 'totk' })}</button>
        </div>
        <div className="flex flex-col space-y-5 flex-1 overflow-auto h-[calc(100vh-48px-68px)]">
          { categories.map((category) => (
            <div key={category.name}>
              <div className="text-yellow text-xl pb-4 pt-2">{t(category.name, { ns: 'totk' })}</div>

              <div className="grid grid-cols-2 text-white text-base">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="py-2"
                  >
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
