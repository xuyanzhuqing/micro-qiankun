import { Suspense, useEffect, useState } from "react";
import './App.scss'
import { routes } from './routes'
import { useRoutes } from "react-router-dom";
import { ConfigProvider, Pagination } from "antd";
import { AliasToken } from "antd/es/theme/interface";
import theme from '@dnt/theme/lib/index'
import { useAppSelector } from 'store/hooks'
import { AppFullback } from '@dnt/components'
import { dntRouteMenuBuilder } from 'utils/router'
import zh_CN from 'antd/locale/zh_CN';
import en_GB from 'antd/locale/en_GB';

const localeMap: any = {
  zh_CN,
  en_GB
}

const App = () => {
  const language = useAppSelector(state => state.share.language as any)
  const menus = useAppSelector((state) => {
    return state.login.menus
  })

  const [rout, setRout] = useState(routes())
  const element = useRoutes(rout);

  let [locale, setLocale] = useState(language)
  const [localPkg, setLocalPkg] = useState(undefined)

  useEffect(() => {
    setLocalPkg(localeMap[language])
    return () => {
      setLocalPkg(undefined)
    }
  }, [language])

  useEffect(() => {
    setRout(dntRouteMenuBuilder(menus))
  }, [menus])

  return (
    <Suspense fallback={<AppFullback />}>
      <ConfigProvider
        locale={localPkg}
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