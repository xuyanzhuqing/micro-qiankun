
import { createFromIconfontCN } from '@ant-design/icons';
import type { ProLayoutProps } from '@ant-design/pro-components';
import loadable from '@loadable/component';
import { Fullback } from '@dnt/components';
import { ObjectType, RegistrableApp } from 'qiankun';
import { Outlet, RouteObject } from 'react-router-dom';
import { routes, DntPureMenuProps } from 'routes/index'
import { compact, uniqBy } from 'lodash-es'
const MyIcon = createFromIconfontCN();

const isPro = process.env.NODE_ENV === 'production'

export const LoadablePage = loadable((props: { page: string }) => import(`views/${props.page}`), {
  fallback: <Fullback />,
  cacheKey: (props: { page: string }) => props.page
});

export const lazyLoad = (moduleName: string) => {
  if (moduleName === 'Outlet') {
    return <Outlet />
  }

  return <LoadablePage page={moduleName} />
};

const makePath = (menu: DntPureMenuProps) => compact([menu.entry, menu.path]).join('/')

// 构建左侧菜单数据
export const dntMenuBuilder = (menus: DntPureMenuProps[]): ProLayoutProps['route'] => {
  const res = menus.map(menu => {
    return {
      path: makePath(menu),
      name: menu.key,
      icon: menu.icon ? <MyIcon type={menu.icon} /> : null,
      lang: menu.lang,
      routes: menu.routes?.map(route => {
        return {
          path: makePath(route),
          name: route.key,
          lang: route.lang,
          desc: route.desc
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
  const microConfig: any = process.env.microConfig
  const defaultMicroDir = '/child'

  if (namespace) {
    const routes = namespace.routes?.filter(v => v.element.endsWith('Micro')) || []
    const uniqueRoutes = uniqBy(routes, 'entry')
    const res = uniqueRoutes.map(route => {
      const entry = route.entry || ''
      const devPort = microConfig?.find((micro: any) => micro.name === entry)?.port
      return {
        name: entry,
        entry: isPro ? `${defaultMicroDir}/${entry}/` : `//localhost:${devPort}`,
        container: '#container',
        activeRule: [namespace.path, entry].join('/')
      }
    })
    return res
  }
  return []
}

// 动态构建路由
export const dntRouteMenuBuilder = (menus: DntPureMenuProps[]): RouteObject[] => {
  const localRouter = routes()
  const root = localRouter.find(v => v.path === '/')
  if (root && root.children) {
    const newRoutes = menus.map(menu => {
      const children = (menu?.routes || []).map(route => ({
        path: makePath(route),
        id: route.key,
        element: lazyLoad(route.element),
      }))
      return {
        path: makePath(menu),
        id: menu.key,
        element: lazyLoad(menu.element),
        children,
      }
    })
    root.children = newRoutes
  }
  return localRouter
}