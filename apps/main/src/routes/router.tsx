import React from "react";
import { RouteObject, redirect } from "react-router-dom";

// 路由懒加载
import Micro from '_qiankun/Micro'
import { mockMenusApi } from 'mock/routes'

// const Main = React.lazy(() => import('views/Main'));
const Layout = React.lazy(() => import('views/Layout'));
const Login = React.lazy(() => import('views/Login'));
const Home = React.lazy(() => import('views/Home'));
const NotFound = React.lazy(() => import('components/NotFound'));

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem('menus')) {
        throw redirect('/login')
      }
      return null
    },
    children: [
      {
        path: "home",
        id: "home",
        element: <Home />
      },
      {
        path: 'system/:id',
        id: "system",
        element: <Micro />
      }
    ]
  },
  // qiankun-boot-injector
  {
    path: "login",
    id: "login",
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;

mockMenusApi().then(res => {

})
