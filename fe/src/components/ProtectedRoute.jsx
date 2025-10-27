//component for redirecting users to login page if not signed in

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // redirect to login if not signed in
    return <Navigate to="/" replace />;
  }

  // otherwise render page
  return children;
};

export default ProtectedRoute;