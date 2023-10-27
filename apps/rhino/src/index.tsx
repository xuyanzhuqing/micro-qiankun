import './public-path'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { AliasToken } from 'antd/es/theme/interface';
import theme from '@dnt/theme/lib'
import i18n from './i18n'
import { BrowserRouter } from "react-router-dom";

let root: ReactDOM.Root

function render(props: { container?: HTMLElement, basename?: string }) {
  root = ReactDOM.createRoot(
    props.container ? props.container : document.getElementById('root') as HTMLElement
  );

  // @ts-ignore
  const basename = window.__POWERED_BY_QIANKUN__ ? props.basename : '/'

  // TODO: 共享 store
  root.render(
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
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
  // console.log('[react16] props from main framework', props);
  // 默认设置多语言
  i18n.changeLanguage(localStorage.getItem('i18nextLng') || 'zh_CN')

  // props.setGlobalState
  // 监听多语言切换
  props.onGlobalStateChange((state: any, prev: any) => {
    // state: 变更后的状态; prev 变更前的状态
    if (state.lng !== prev.lng) {
      console.log(state, prev);
      i18n.changeLanguage(state.lng)
    }
  });
  render(props);
}

export async function unmount(props: any) {
  root.unmount()
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
