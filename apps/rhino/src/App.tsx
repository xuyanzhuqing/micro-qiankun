import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import { Button } from 'antd';
import { useTranslation, Trans } from "react-i18next";
const { name } = require('../package.json')

function App() {
  // @ts-ignore
  const basename = window.__POWERED_BY_QIANKUN__ ? `/system` : '/'
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <BrowserRouter basename={basename}>
      <div className="App">
        {name}
      </div>
      <h2>{t("add")}</h2>
      <Trans i18nKey="add">trans</Trans>
      <button onClick={() => changeLanguage("de")}>de</button>
      <button onClick={() => changeLanguage("en")}>en</button>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
      <span className="iconfont icon-sort"></span>
      <a href="/login">to login</a>
    </BrowserRouter>
  );
}

export default App;
