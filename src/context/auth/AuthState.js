import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AUTH_API, REG_API, fetchConfig } from '../api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOADING,
  LOGOUT,
} from '../types';

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoading = () => dispatch({ type: LOADING });

  /**
   * Auth context action for registering new user.
   *
   * Example:
   *
   *      register(user)
   *      register({name: 'John', email: 'rambo@gmail.com', password: 'hey123'})
   *
   */
  const register = async (user) => {
    console.log(fetchConfig('POST', user));
    setLoading();
    try {
      const res = await fetch(REG_API, fetchConfig('POST', user));
      const data = await res.json();
      if (!res.ok) throw data.error;

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.token,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  /**
   * Auth context action for logging in use.
   *
   * Example:
   *
   *      login(user)
   *      login({email: 'rambo@gmail.com', password: 'hey123')
   *
   */
  const login = async (user) => {
    setLoading();
    try {
      const res = await fetch(AUTH_API, fetchConfig('POST', user));
      const data = await res.json();
      if (!res.ok) throw data.error;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };

  /**
   * Auth context action for loading user data when authenticated.
   *
   * Example:
   *
   *      loadUser()
   *
   */
  const loadUser = async () => {
    setLoading();
    try {
      const res = await fetch(AUTH_API, fetchConfig('GET'));
      const data = await res.json();
      if (!res.ok) throw data.error;

      dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };

  /**
   * Auth context action for logout.
   *
   * Example:
   *
   *      logout()
   *
   */
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        authError: state.error,
        loading: state.loading,
        token: state.token,
        register,
        login,
        loadUser,
        logout,
      }}
    >
      <ContextDevTool context={AuthContext} id="authContext" displayName="Auth Context" />
      {children}
    </AuthContext.Provider>
  );
};

AuthState.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthState;
