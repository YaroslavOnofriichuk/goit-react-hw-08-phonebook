import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LimitedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return !isLoggedIn ? children : <Navigate to="/contacts" />;
};

LimitedRoute.propTypes = {
  children: PropTypes.object,
};
