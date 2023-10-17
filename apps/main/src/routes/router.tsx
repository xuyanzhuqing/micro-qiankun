import React from "react";
import { RouteObject, redirect } from "react-router-dom";

// 路由懒加载
const Login = React.lazy(() => import('views/Login'));
const Home = React.lazy(() => import('views/Home'));
const Main = React.lazy(() => import('views/Main'));
const Micro = React.lazy(() => import('views/Micro'));

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    loader: async () => {
      throw redirect('/login')
    }
  },
  {
    path: "/home",
    id: "home",
    element: <Main />,
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  },
  {
    path: '/system',
    id: "system",
    element: <Main />,
    children: [
      {
        path: ':id',
        id: 'micro',
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
];

export default routes;
