import { useEffect } from "react";
import { registerMicroApps, start } from 'qiankun';
import { getRoutesApi } from "apis/route";
import { mockRoutes } from 'mock/routes'
const isPro = process.env.NODE_ENV === 'production'

const App: React.FC = () => {
  useEffect(() => {
    // getRoutesApi({ mode: isPro ? 1 : 0 }).then(res => {
    //   // https://qiankun.umijs.org/zh/faq#%E5%A6%82%E4%BD%95%E5%9C%A8%E4%B8%BB%E5%BA%94%E7%94%A8%E7%9A%84%E6%9F%90%E4%B8%AA%E8%B7%AF%E7%94%B1%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E5%BE%AE%E5%BA%94%E7%94%A8
    //   if (!window.qiankunStarted) {
    //     window.qiankunStarted = true;
    //     registerMicroApps(res.data.content)
    //     start({
    //       sandbox: false
    //     })
    //   }
    // })

    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      registerMicroApps(mockRoutes)
      start({
        sandbox: false
      })
    }

    // start({ sandbox: false })

    return () => {
      window.qiankunStarted = false;
    }
  }, [])

  return (
    <div id="container"></div>
  )
};

export default App;