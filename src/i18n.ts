import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'
import tw from '@/locales/zh-TW.json'

const resources = {
  en,
  ja,
  tw
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'tw',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
