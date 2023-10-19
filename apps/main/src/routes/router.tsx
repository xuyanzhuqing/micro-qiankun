import React from "react";
import { RouteObject, redirect } from "react-router-dom";

// 路由懒加载
import Micro from '_qiankun/Micro'
const Main = React.lazy(() => import('views/Main'));
const Login = React.lazy(() => import('views/Login'));
const Home = React.lazy(() => import('views/Home'));

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: <Main />,
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
      },
    ]
  },
  // qiankun-boot-injector
  {
    path: "login",
    id: "login",
    element: <Login />,
  },
];

export default routes;
