import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // const loadUser = async token => {
  //   try {
  //     const res = fetch()
  //   } catch (err) {

  //   }
  // }

  const signFetchConfig = (user) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
  };

  // const authFetchConfig = (token) => {
  //   return {
  //     method: 'GET',
  //     headers: {
  //       'x-auth-token': token
  //     },
  //   };
  // };

  const AUTH_URL = 'http://localhost:5000/auth';
  const REG_URL = 'http://localhost:5000/users';

  const register = async (user) => {
    try {
      const res = await fetch(REG_URL, signFetchConfig(user));
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

  // TODO: Login action

  const login = async (user) => {
    console.log(user);
    try {
      const res = await fetch(AUTH_URL, signFetchConfig(user));
      const data = await res.json();
      console.log(data);

      // if response is not ok throw exeption catched later
      if (!res.ok) throw data.error;

      // if res is ok then proceed
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    }
  };

  // TODO: Load user if token exist

  // TODO: Logout user

  // TODO: Set loading

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
