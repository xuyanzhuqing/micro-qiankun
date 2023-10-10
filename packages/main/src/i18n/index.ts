import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import * as en_GB from './locals/en_GB'
import * as zh_CN from './locals/zh_CN'

export const defaultNS = "welcome";
export const resources = {
  en_GB,
  zh_CN
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || 'zh_CN',
    // we init with resources
    resources,
    fallbackLng: "zh_CN",
    debug: true,

    // have a common namespace used around the full app
    ns: ["welcome", "system", "pc", "validation"],
    defaultNS: defaultNS,

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
