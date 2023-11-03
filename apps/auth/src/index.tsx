import './public-path'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from 'store'
import { storeShared } from '_qiankun'
const { name: appName } = require('../package.json')

let root: ReactDOM.Root

function render(props: { container?: HTMLElement, basename?: string }) {
  root = ReactDOM.createRoot(
    props.container ? props.container : document.getElementById('root') as HTMLElement
  );

  // @ts-ignore
  const basename = window.__POWERED_BY_QIANKUN__ ? props.basename : '/'

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode >
  );
}

//@ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  // console.log('[react16] react app bootstraped');
}

export async function mount(props: any) {
  // 装填微服务监听程序
  storeShared
    .setMicroAppStateActions(props)
    .setAppName(appName)
    .listen()

  // 默认设置多语言
  i18n.changeLanguage(localStorage.getItem('i18nextLng') || 'zh_CN')
  render(props);
}

export async function unmount(props: any) {
  root.unmount()
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
