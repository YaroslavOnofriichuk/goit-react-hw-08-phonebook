import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const LimitedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return !isLoggedIn ? children : <Navigate to="/contacts" />;
};
