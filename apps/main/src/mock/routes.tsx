import type { MenuProps } from 'antd';

interface MakeMenus {
  (microApps: any[]): MenuProps['items']
}

export const mockRoutes = [
  {
    "id": 1,
    "name": "rhino",
    "entry": "//localhost:3002",
    "container": "#container",
    "activeRule": "system/rhino",
    "mode": 0
  },
  // {
  //   "id": 2,
  //   "name": "land",
  //   "entry": "/child/land/",
  //   "container": "#container",
  //   "activeRule": "system/land",
  //   "mode": 1
  // },
  // {
  //   "id": 3,
  //   "name": "sea",
  //   "entry": "//localhost:3001",
  //   "container": "#container",
  //   "activeRule": "system/sea",
  //   "mode": 0
  // },
  // {
  //   "id": 4,
  //   "name": "sea",
  //   "entry": "/child/sea/",
  //   "container": "#container",
  //   "activeRule": "system/sea",
  //   "mode": 1
  // }
].filter(v => v.mode === 0)

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