// component to redirect to home page if user signed in

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const GuestRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    // if signed in, navigate to home page
    return <Navigate to="/" replace />;
  }

  // otherwise render page
  return children;
};

export default GuestRoute;