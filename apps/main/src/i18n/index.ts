import locale from '@dnt/locale'
import * as en_GB from './locales/en_GB'
import * as zh_CN from './locales/zh_CN'

export const localResources = {
  en_GB,
  zh_CN
} as const

// 动态加载当前项目需要的语言包
const en_GB_keys = Object.keys(en_GB) as Array<keyof typeof en_GB>
en_GB_keys.forEach(key => {
  console.info(key, en_GB[key])
  locale.addResourceBundle('en_GB', key, en_GB[key])
})

const zh_CN_keys = Object.keys(zh_CN) as Array<keyof typeof zh_CN>
zh_CN_keys.forEach(key => {
  locale.addResourceBundle('zh_CN', key, zh_CN[key])
})

export default locale