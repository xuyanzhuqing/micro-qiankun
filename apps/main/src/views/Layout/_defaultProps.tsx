import type { ProLayoutProps } from '@ant-design/pro-components';

const proLayoutProps: Partial<ProLayoutProps> = {
  title: 'DNT',
  fixSiderbar: true,
  layout: 'mix',
  splitMenus: false,
  collapsed: false,
  location: {
    // 修复 f5 刷新菜单选中与路由不符
    pathname: window.location.pathname,
  },
  route: {
    desc: ''
  },
}

export default proLayoutProps