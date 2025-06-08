import { Dropdown, ToggleSwitch, Flowbite } from 'flowbite-react'
import type { CustomFlowbiteTheme } from 'flowbite-react'

import image from '@/constants/image'

const customTheme: CustomFlowbiteTheme = { toggleSwitch: { toggle: {
  base: 'toggle-bg h-6 w-11 rounded-full border'
} } }

function LanguageItem({ item }:{item:{id:string, name:string}}) {
  const { i18n } = useTranslation()
  return (
    <Dropdown.Item
      className="text-base"
      onClick={() => { i18n.changeLanguage(item.id) }}>
      {item.name}
    </Dropdown.Item>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const languageItems:{
    [key:string]:{id:string, name:string}
  } = {
    tw: { id: 'tw', name: '繁體中文' },
    ja: { id: 'ja', name: '日本語' },
    en: { id: 'en', name: 'English' }
  }

  const [showCompleted, setShowCompleted] = useState(false)
  const [showPlaceName, setShowPlaceName] = useState(false)

  return (
    <div className="navbar w-full relative z-[999] flex justify-between h-12 items-center px-5 cursor-default">
      <div className="title flex items-center space-x-4 text-xl font-semibold text-yellow-light ">
        <img
          className="w-12"
          src={image.zelda}
          alt="zelda" />
        <span>{t('Zelda', { ns: 'common' })}</span>
        <span>{t('Tears of the Kingdom', { ns: 'common' })}</span>
        <span>{t('interactive-map', { ns: 'common' })}</span>
      </div>
      <div className="flex items-center space-x-10 font-normal text-white">
        <div>
          <Dropdown
            label
            placement="bottom-start"
            className="!left-5 w-[280px]"
            renderTrigger={() => (
              <div>
                <img
                  className="h-6 cursor-pointer"
                  src={image.tool}
                  alt="" />
              </div>
            )}>
            <div className="py-3 pl-3 flex flex-col space-y-4">
              <Flowbite theme={{ theme: customTheme }}>
                <ToggleSwitch
                  className="!focus:outline-none"
                  checked={showCompleted}
                  label="Show completed marker"
                  onChange={() => {
                    setShowCompleted(!showCompleted)
                  }} />
                <ToggleSwitch
                  checked={showPlaceName}
                  label="Always show location name"
                  onChange={() => {
                    setShowPlaceName(!showPlaceName)
                  }} />
              </Flowbite>

            </div>
            <div />
          </Dropdown>
        </div>

        <div className="w-[130px]">
          <Dropdown
            label
            className="!-left-1 w-[140px]"
            renderTrigger={() => (
              <div className="w-[120px] flex items-center space-x-2 cursor-pointer">
                <img
                  className="h-6"
                  src={image.language}
                  alt="language" />
                <span>{languageItems[i18n.language].name}</span>
              </div>
            )}>
            {Object.values(languageItems).map((item) => (
              <LanguageItem
                key={item.id}
                item={item} />
            ))}
          </Dropdown>
        </div>

      </div>

    </div>
  )
}
