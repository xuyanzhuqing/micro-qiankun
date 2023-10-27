import './App.scss';
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import theme from '@dnt/theme'
import { AliasToken } from "antd/es/theme/interface";
import { Suspense, useState } from 'react';
import { Fullback } from '@dnt/components'
import { routes } from './routes'

function App() {
  const [rout, setRout] = useState(routes())
  const element = useRoutes(rout);
  return (
    <Suspense fallback={<Fullback />}>
      <ConfigProvider
        theme={{
          token: theme.basicTheme as Partial<AliasToken>,
        }}
      >
        {element}
      </ConfigProvider>
    </Suspense>
  );
}

export default App;
