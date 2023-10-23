import { Suspense, useEffect, useState } from "react";
import './App.scss'
import { routes } from './routes'
import { useRoutes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AliasToken } from "antd/es/theme/interface";
import theme from '@dnt/theme/lib/index'
import { useAppSelector } from 'store/hooks'
import Fullback from 'components/Fullback'
import { dntRouteMenuBuilder } from 'utils/router'

const App = () => {
  const language = useAppSelector(state => state.app.language as any)
  const menus = useAppSelector((state) => {
    return state.login.menus
  })

  const [rout, setRout] = useState(routes())
  const element = useRoutes(rout);

  let [locale, setLocale] = useState(language)

  useEffect(() => {
    (async () => {
      setLocale(language)
    })()
  }, [language])

  useEffect(() => {
    setRout(dntRouteMenuBuilder(menus))
  }, [menus])

  return (
    <Suspense fallback={<Fullback />}>
      <ConfigProvider
        locale={locale}
        theme={{
          token: theme.basicTheme as Partial<AliasToken>,
        }}
      >
        {element}
      </ConfigProvider>
    </Suspense>
  )
}

export default App;