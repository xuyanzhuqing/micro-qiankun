import StoreShared, { EventBusType, QianKunState } from '@dnt/utils/lib/StoreShared'
import store, { type RootState } from 'store'
import i18n from '../i18n'

export { EventBusType } from '@dnt/utils/lib/StoreShared';

/**
 * 实例化微服务共享状态类，QianKunState 在微服务 mount 处定义
 */
export const storeShared = new StoreShared<RootState, QianKunState>(store)

storeShared.on(EventBusType.SET_LANGUAGE, (state, prev) => {
  i18n.changeLanguage(state.lng)
})
