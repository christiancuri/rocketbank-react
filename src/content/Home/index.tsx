import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';

export default function Home() {
  const auth = useAuth();
  if (auth.isAuthenticated) return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
}
