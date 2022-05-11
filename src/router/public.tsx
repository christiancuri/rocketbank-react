import { lazy } from 'react';
import { PartialRouteObject } from 'react-router';

import BaseLayout from 'src/layouts/BaseLayout';

const Login = lazy(() => import('src/content/authentication/sign-in'));
const SignUp = lazy(() => import('src/content/authentication/sign-up'));
const Home = lazy(() => import('src/content/Home'));

export const publicRoutes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      }
    ]
  }
];
