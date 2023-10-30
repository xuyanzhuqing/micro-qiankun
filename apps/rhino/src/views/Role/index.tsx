import { Language } from '@dnt/locale';
import { EventBusType } from '@dnt/utils/lib/StoreShared';
import { storeShared } from '_qiankun';
import { Button } from 'antd';
import { useTranslation, Trans } from "react-i18next";
const { name } = require('../../../package.json')

function App() {
  // @ts-ignore
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: Language) => {
    storeShared.emit(EventBusType.SET_LANGUAGE, { lng: lng })
  };
  return (
    <>
      <div className="App">
        {name}
      </div>
      <h2>{t("add")}</h2>
      <Trans i18nKey="add">trans</Trans>
      <button onClick={() => changeLanguage(Language.zh_CN)}>zh_CN</button>
      <button onClick={() => changeLanguage(Language.en_GB)}>en</button>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
      <span className="iconfont icon-sort"></span>
      <a href="/login">to login</a>
    </>
  );
}

export default App;
