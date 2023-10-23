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
            path: 'rhino',
            key: 'rhino',
            lang: {
              en_GB: 'rhino',
              zh_CN: '犀牛'
            },
            "entry": "/child/rhino/",
            "container": "#container",
            element: 'Micro'
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