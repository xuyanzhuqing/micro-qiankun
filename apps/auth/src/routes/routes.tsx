import { Outlet, RouteObject, redirect } from "react-router-dom";
import React from "react";

const NotFound = React.lazy(() => import('@dnt/components/dist/NotFound'))
const User = React.lazy(() => import('views/User'))
const Role = React.lazy(() => import('views/Role'))
const routes = (): RouteObject[] => [
  {
    path: "/",
    id: "root",
    element: <Outlet />,
    children: [
      {
        path: "role",
        id: "role",
        element: <Role />,
      },
      {
        path: "user",
        id: "user",
        element: <User />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
];

export default routes;