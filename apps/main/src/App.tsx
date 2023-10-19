import { Suspense, useEffect, useState } from "react";
import './App.scss'
import routes from './routes/router'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AliasToken } from "antd/es/theme/interface";
import theme from '@dnt/theme/lib/index'
import { useAppSelector } from 'store/hooks'
import zh_CN from 'antd/locale/zh_CN'
import en_GB from 'antd/locale/en_GB'
import Fullback from 'components/Fullback'

const localeMap: any = {
  zh_CN,
  en_GB
}

const App = () => {
  const router = createBrowserRouter(routes)
  const language = useAppSelector(state => state.app.language)
  let [locale, setLocale] = useState(undefined)

  useEffect(() => {
    (async () => {
      setLocale(localeMap[language])
    })()
    return () => {
      setLocale(undefined)
    }
  }, [language])
  return <Suspense fallback={<Fullback />}>
    <ConfigProvider
      locale={locale}
      theme={{
        token: theme.basicTheme as Partial<AliasToken>,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Suspense>
}

export default App;