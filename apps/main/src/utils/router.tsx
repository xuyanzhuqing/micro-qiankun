
import { createFromIconfontCN } from '@ant-design/icons';
import type { ProLayoutProps } from '@ant-design/pro-components';
import { Language } from '@dnt/locale';
import loadable from '@loadable/component';
import Fullback from 'components/Fullback';
import { ObjectType, RegistrableApp } from 'qiankun';
import { Outlet, RouteObject } from 'react-router-dom';
import { routes, DntMicroMenuProps, DntPureMenuProps } from 'routes/index'

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


// 构建左侧菜单数据
export const dntMenuBuilder = (menus: DntPureMenuProps[]): ProLayoutProps['route'] => {

  const res = menus.map(menu => {
    return {
      path: menu.path,
      name: menu.lang.zh_CN,
      icon: menu.icon ? <MyIcon type={menu.icon} /> : null,
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
  const microConfig: any = process.env.microConfig

  if (namespace) {
    const res = namespace.routes?.filter(v => v.element.endsWith('Micro')) || []
    const defaultMicroDir = '/child'
    return res.map(v => {
      const devPort = microConfig.find((micro: any) => micro.name === v.path).port
      return {
        name: v.key,
        entry: isPro ? `/${defaultMicroDir}/${v.path}/` : `//localhost:${devPort}`,
        container: '#container',
        activeRule: [namespace.path, v.path].join('/'),
      }
    })
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
        path: route.path,
        id: route.key,
        element: lazyLoad(route.element)
      }))
      return {
        path: menu.path,
        id: menu.key,
        element: lazyLoad(menu.element),
        children
      }
    })
    root.children = newRoutes
  }
  return localRouter
}