import { initGlobalState, MicroAppStateActions } from 'qiankun';
import i18nInstance from '../i18n'

const state = {
  lng: 'zh_CN'
}

// 初始化 state
const microAppStateActions: MicroAppStateActions = initGlobalState(state);

microAppStateActions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  // if (state.lng !== prev.lng) {
  //   i18nInstance.changeLanguage(state.lng);
  // }
});

// actions.setGlobalState(state);
export default microAppStateActions
