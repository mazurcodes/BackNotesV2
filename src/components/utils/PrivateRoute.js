import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import routes from '../../routes/routes';

const PrivateRoute = ({ component: Component, render, exact, path }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Redirect to={routes.login} />;
  if (render) return <Route exact={exact} path={path} render={render} />;
  return <Route exact={exact} path={path} component={Component} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
  component: null,
  render: null,
  exact: false,
};

export default PrivateRoute;
