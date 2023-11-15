import './App.scss';
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import theme from '@dnt/theme'
import { AliasToken } from "antd/es/theme/interface";
import { Suspense, useEffect, useState } from 'react';
import { AppFullback } from '@dnt/components'
import { routes } from './routes'
import zh_CN from 'antd/locale/zh_CN';
import en_GB from 'antd/locale/en_GB';
import { useAppSelector } from 'store/hooks';

const localeMap: any = {
  zh_CN,
  en_GB
}

const App = () => {
  const [rout, setRout] = useState(routes())
  const element = useRoutes(rout);

  const language = useAppSelector((state) => {
    return state.share.language
  })

  let [locale, setLocale] = useState(undefined)

  useEffect(() => {
    setLocale(localeMap[language])
    return () => {
      setLocale(undefined)
    }
  }, [language])

  return (
    <Suspense fallback={<AppFullback />}>
      <ConfigProvider
        locale={locale}
        theme={{
          token: theme.basicTheme as Partial<AliasToken>,
        }}
      >
        {element}
      </ConfigProvider>
    </Suspense>
  );
}

export default App