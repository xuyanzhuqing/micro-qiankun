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
    registerMicroApps(apps)
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