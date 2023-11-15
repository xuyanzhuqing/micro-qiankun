import StoreShared, { EventBusType, QianKunState } from '@dnt/utils/lib/StoreShared'
import store, { type RootState } from 'store'
import { initGlobalState, MicroAppStateActions } from 'qiankun';
import i18nInstance from '../i18n'
export { EventBusType } from '@dnt/utils/lib/StoreShared';

const qiankunState: QianKunState = {
  eventBusType: EventBusType.VOID,
  lng: localStorage.getItem('i18nextLng'),
  menus: []
}

// 初始化 state
const microAppStateActions: MicroAppStateActions = initGlobalState(qiankunState);

export const storeShared = new StoreShared<RootState, QianKunState>(store, microAppStateActions)

storeShared.on(EventBusType.SET_LANGUAGE, (state, prev) => {
  store.dispatch({
    type: 'share/changeLngAction', payload: state.lng
  })
  i18nInstance.changeLanguage(state.lng)
})