import { RouteObject, useLocation } from "react-router-dom";
import React from "react";
import { lazyLoad } from "utils/router";

const NotFound = React.lazy(() => import('@dnt/components/dist/NotFound'))
const Login = React.lazy(() => import('views/Login'))
const Layout = React.lazy(() => import('views/Layout'))

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  if (!sessionStorage.getItem('menus')) {
    return lazyLoad('Login')
  }

  // 在登录的情况下默认跳转 home
  if (location.pathname === '/') {
    window.location.replace('/home')
    return null
  }

  return children
}

const routes = (): RouteObject[] => [
  {
    path: "/",
    id: "root",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: []
  },
  // qiankun-boot-injector
  {
    path: "login",
    id: "login",
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
];

export default routes;