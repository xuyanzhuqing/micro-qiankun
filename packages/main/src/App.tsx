import { Suspense } from "react";
import './App.scss'
import routes from './routes/router'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AliasToken } from "antd/es/theme/interface";
import theme from '@dnt/theme/lib/index'

const App = () => {
  const router = createBrowserRouter(routes)
  return <Suspense fallback={<p></p>}>
    <ConfigProvider
      theme={{
        token: theme.basicTheme as Partial<AliasToken>,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Suspense>
}

export default App;