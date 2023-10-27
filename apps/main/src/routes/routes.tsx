import { RouteObject, redirect } from "react-router-dom";
import React from "react";
import { lazyLoad } from "utils/router";

const NotFound = React.lazy(() => import('@dnt/components/dist/NotFound'))

const routes = (): RouteObject[] => [
  {
    path: "/",
    id: "root",
    element: lazyLoad('Layout'),
    loader: () => {
      if (!localStorage.getItem('menus')) {
        throw redirect('/login')
      }
      return null
    },
    children: []
  },
  // qiankun-boot-injector
  {
    path: "login",
    id: "login",
    element: lazyLoad('Login'),
  },
  {
    path: '*',
    element: <NotFound />,
  }
];

export default routes;