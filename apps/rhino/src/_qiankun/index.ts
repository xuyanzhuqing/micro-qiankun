import StoreShared, { EventBusType, QianKunState } from '@dnt/utils/lib/StoreShared'
import { Provider } from 'react-redux';
import store, { type RootState } from 'store'
import i18n from '../i18n'

export const storeShared = new StoreShared<RootState, QianKunState>(store)

storeShared.on(EventBusType.SET_LANGUAGE, (state, prev) => {
  i18n.changeLanguage(state.lng)
})
