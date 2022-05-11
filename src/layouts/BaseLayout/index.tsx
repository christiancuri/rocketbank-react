import { FC, ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import PropTypes from 'prop-types';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAuth } from 'src/contexts/AuthContext';

interface BaseLayoutProps {
  children?: ReactNode;
}

const Render = (children: ReactNode) => {
  const { user, isAuthenticated, initialized } = useAuth();

  if (!initialized) return <SuspenseLoader />;

  if (isAuthenticated) {
    if (user) {
      return children || <Outlet />;
    }
    return <SuspenseLoader />;
  }
  return children || <Outlet />;
};

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <Suspense fallback={<SuspenseLoader />}>{Render(children)}</Suspense>;
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
