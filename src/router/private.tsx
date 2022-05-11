import { lazy } from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';

const Dashboard = lazy(() => import('src/content/dashboard'));

const Clients = lazy(() => import('src/content/applications/Clients'));

export const privateRoutes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '*',
        element: <Navigate to="/dashboard" />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/management/clients" replace />
      },
      {
        path: 'clients',
        element: <Clients />
      }
    ]
  }
];
