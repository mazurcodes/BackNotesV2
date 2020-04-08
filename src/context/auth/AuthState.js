import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AUTH_API, REG_API } from '../api';
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

  const signFetchConfig = (user) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
  };

  const authFetchConfig = (token) => {
    return {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    };
  };

  const setLoading = () => dispatch({ type: LOADING });

  const register = async (user) => {
    setLoading();
    try {
      const res = await fetch(REG_API, signFetchConfig(user));
      const data = await res.json();

      // if response is not ok throw exeption
      if (!res.ok) throw data.error;

      // if res is ok then proceed with dispatch
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

  const login = async (user) => {
    setLoading();
    try {
      const res = await fetch(AUTH_API, signFetchConfig(user));
      const data = await res.json();

      // if response is not ok throw exeption catched later
      if (!res.ok) throw data.error;

      // if res is ok then proceed
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

  const loadUser = async (token) => {
    if (!token) return;
    setLoading();
    try {
      const res = await fetch(AUTH_API, authFetchConfig(token));
      const data = await res.json();

      // if response is not ok throw exeption catched later
      if (!res.ok) throw data.error;

      // if res is ok then proceed
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

  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
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
