import type { MenuProps } from 'antd';
import type { ProLayoutProps } from '@ant-design/pro-components';
import { Language } from '@dnt/locale';
import { ObjectType, RegistrableApp } from 'qiankun';
import { RouteObject } from 'react-router-dom';

const isPro = process.env.NODE_ENV === 'production'

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
  {
    "id": 2,
    "name": "rhino",
    "entry": "/child/rhino/",
    "container": "#container",
    "activeRule": "system/rhino",
    "mode": 1
  },
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

interface DntMicroMenuProps {
  container: string;
  entry: string;
}

export interface DntPureMenuProps {
  path: string;
  key: string;
  lang: Record<Language, string>;
  icon?: string;
  routes?: Array<DntMicroMenuProps & DntPureMenuProps | DntPureMenuProps>;
  isMicRo?: 1 | 0;
}

//模拟后端返回数据
export const mockMenusApi = (interval = 200): Promise<DntPureMenuProps[]> => {
  return new Promise((resolve, reject) => {
    const menus: DntPureMenuProps[] = [
      {
        path: '/home',
        key: 'home',
        lang: {
          en_GB: 'Home',
          zh_CN: '首页'
        },
        icon: 'ss1',
      },
      {
        path: '/system',
        key: 'system',
        lang: {
          en_GB: 'system',
          zh_CN: '系统配置'
        },
        icon: 'sss',
        routes: [
          {
            path: 'rhino',
            key: 'rhino',
            lang: {
              en_GB: 'rhino',
              zh_CN: '犀牛'
            },
            icon: 'xxx',
            "entry": "/child/rhino/",
            "container": "#container",
            isMicRo: 1,
          },
          {
            path: 'hippo',
            key: 'hippo',
            lang: {
              en_GB: 'hippo',
              zh_CN: '河马'
            },
            icon: 'sss',
            isMicRo: 0,
          }
        ],
      }
    ]

    setTimeout(() => {
      resolve(menus)
    }, interval)
  })
}

// 构建左侧菜单数据
export const dntMenuBuilder = (menus: DntPureMenuProps[]): ProLayoutProps['route'] => {

  const res = menus.map(menu => {
    return {
      path: menu.path,
      name: menu.lang.zh_CN,
      routes: menu.routes?.map(route => {
        return {
          path: route.path,
          name: route.lang.zh_CN
        }
      })
    }
  })

  return {
    path: '/',
    routes: res
  }
}

// 构建微服务注册所需信息
export const dntMicroMenuBuilder = (menus: DntPureMenuProps[], pathname: string): RegistrableApp<ObjectType>[] => {
  const namespace = menus.find(menu => pathname.startsWith(menu.path))

  if (namespace) {
    const res = namespace.routes?.filter(v => v.isMicRo) || []
    const defaultMicroDir = '/child'
    return res.map(v => ({
      name: v.key,
      entry: isPro ? `/${defaultMicroDir}/${v.path}/` : "//localhost:3001",
      container: '#container',
      activeRule: [namespace.path, v.path].join('/'),
    }))
  }
  return []
}

// 动态构建路由
export const dntRouteMenuBuilder = (menus: DntPureMenuProps[]): RouteObject[] => {
  return []
}