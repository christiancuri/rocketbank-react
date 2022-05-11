import React, { FC, ReactNode } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import BaseLayout from '../BaseLayout';
import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
`
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.initialized && !auth.isAuthenticated)
    return <Navigate to="/" state={{ from: location }} />;

  return (
    <BaseLayout>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </BaseLayout>
  );
};

export default SidebarLayout;
