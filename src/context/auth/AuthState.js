import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

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

  // const authUrl = 'http://localhost:5000/auth';
  const userUrl = 'http://localhost:5000/users';

  const register = async (user) => {
    console.log(JSON.stringify(user));
    try {
      const res = await fetch(userUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);

      // if response is not ok throw exeption catched later
      if (!res.ok) throw data.error;

      // if res is ok then proceed
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.token,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  // TODO: Login action

  // const login = async user => {

  // }

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
