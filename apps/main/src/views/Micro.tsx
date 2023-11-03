import { useEffect } from "react";
import { registerMicroApps, start } from 'qiankun';
import { dntMicroMenuBuilder } from 'utils/router'
import { useAppSelector } from "store/hooks";
import { useLocation } from 'react-router-dom';
import { storeShared, EventBusType } from '_qiankun';

const App: React.FC = () => {
  const menus = useAppSelector((state) => {
    return state.login.menus
  })

  let location = useLocation();

  useEffect(() => {
    const apps = dntMicroMenuBuilder(menus, location.pathname)

    // 传递菜单信息到各个微应用
    const mixedProps = apps.map(app => {
      app.props = {
        basename: app.activeRule
      }
      return app
    })

    registerMicroApps(
      mixedProps,
      {
        afterMount: [(app) => new Promise((resolve, reject) => {
          storeShared.emit(EventBusType.SYNC, { auth: ['来自 main 的数据'] })
          /**
           * 未知返回
           */
          resolve([])
        })],
      },
    )

    start({
      sandbox: false
    })
  }, [location, menus])

  return (
    <div id="container"></div>
  )
};

export default App;