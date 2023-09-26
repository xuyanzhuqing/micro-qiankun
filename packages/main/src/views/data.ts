import type { MenuProps } from 'antd';

interface MakeMenus {
  (microApps: any[]): MenuProps['items']
}

export const makeMenus: MakeMenus = (microApps: any[]) => ([
  {
    key: 'home',
    label: 'Home',
    icon: 'my-icon-aixin'
  },
  {
    key: 'system',
    label: 'system',
    icon: 'my-icon-404',
    children: microApps.map(({ name }) => ({ key: name, label: name }))
  },
])