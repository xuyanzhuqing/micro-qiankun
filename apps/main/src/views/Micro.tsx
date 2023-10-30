import { useEffect } from "react";
import { registerMicroApps, start } from 'qiankun';
import { dntMicroMenuBuilder } from 'utils/router'
import { useAppSelector } from "store/hooks";
import { useLocation } from 'react-router-dom';

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

    registerMicroApps(mixedProps)

    start({
      sandbox: false
    })

    return () => {
      window.qiankunStarted = false;
    }
  }, [location, menus])

  return (
    <div id="container"></div>
  )
};

export default App;