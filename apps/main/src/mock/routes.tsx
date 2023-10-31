import { DntPureMenuProps } from 'routes/type';

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
        icon: 'my-icon-aixin',
        element: 'Home'
      },
      {
        path: '/system',
        key: 'system',
        lang: {
          en_GB: 'system',
          zh_CN: '系统配置'
        },
        icon: 'my-icon-aixin',
        element: 'Outlet',
        routes: [
          {
            path: 'role',
            key: 'role',
            lang: {
              en_GB: 'role',
              zh_CN: '角色管理'
            },
            "entry": "rhino",
            "container": "#container",
            element: 'Micro',
          },
          {
            path: 'user',
            key: 'user',
            lang: {
              en_GB: 'user',
              zh_CN: '用户管理'
            },
            "entry": "rhino",
            "container": "#container",
            element: 'Micro',
          },
          {
            path: 'role',
            key: 'role',
            lang: {
              en_GB: 'role',
              zh_CN: '角色管理'
            },
            "entry": "auth",
            "container": "#container",
            element: 'Micro',
          },
          {
            path: 'user',
            key: 'user',
            lang: {
              en_GB: 'user',
              zh_CN: '用户管理'
            },
            "entry": "auth",
            "container": "#container",
            element: 'Micro',
          },
          {
            path: 'hippo',
            key: 'hippo',
            lang: {
              en_GB: 'hippo',
              zh_CN: '河马'
            },
            element: 'Hippo'
          }
        ],
      }
    ]

    setTimeout(() => {
      resolve(menus)
    }, interval)
  })
}
