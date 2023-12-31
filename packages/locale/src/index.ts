import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import * as en_GB from './locales/en_GB'
import * as zh_CN from './locales/zh_CN'

export const defaultNS = "system";

export const resources = {
  en_GB,
  zh_CN
} as const

export enum Language {
  en_GB = 'en_GB',
  zh_CN = 'zh_CN'
}

export const LanguageEnum: Array<{ value: Language, label: string }> = [
  {
    value: Language.en_GB,
    label: 'English',
  },
  {
    value: Language.zh_CN,
    label: '简体中文'
  }
]

export const fallbackLng = Language.zh_CN

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || Language.zh_CN,
    // we init with resources
    resources,
    fallbackLng,
    debug: true,

    // have a common namespace used around the full app
    ns: ["welcome", "system", "pc", "validation"],
    defaultNS: defaultNS,

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

// after i18next.init(options);
i18n.services.formatter?.add('lowercase', (value: string, lng, options) => {
  return value.toLowerCase();
});
i18n.services.formatter?.add('toUpperCase', (value: string, lng, options) => {
  return value.toUpperCase();
});
i18n.services.formatter?.add('underscore', (value: string, lng, options) => {
  return value.replace(/\s+/g, '_');
});
i18n.services.formatter?.add('toLocalDate', (value: string | number, lng, options) => {
  const locale = lng?.replace('_', '-') || fallbackLng
  return new Intl.DateTimeFormat(locale).format(new Date(value))
});

export default i18n;
