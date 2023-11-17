import { Suspense, useEffect, useState } from "react";
import './App.scss'
import { routes } from './routes'
import { useRoutes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AliasToken } from "antd/es/theme/interface";
import theme from '@dnt/theme/lib/index'
import { useAppSelector } from 'store/hooks'
import { AppFullback } from '@dnt/components'
import { dntRouteMenuBuilder } from 'utils/router'
import zh_CN from 'antd/locale/zh_CN';
import en_GB from 'antd/locale/en_GB';
import { useValidateMsgs } from 'hooks/useValidateMsgs'

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

  let [locale, setLocale] = useState(undefined)

  useEffect(() => {
    setLocale(localeMap[language])
    return () => {
      setLocale(undefined)
    }
  }, [language])

  useEffect(() => {
    setRout(dntRouteMenuBuilder(menus))
  }, [menus])

  const validateMessages = useValidateMsgs()

  return (
    <Suspense fallback={<AppFullback />}>
      <ConfigProvider
        form={{ validateMessages }}
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