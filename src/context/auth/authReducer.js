import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        user: null,
        token: '',
        loading: false,
        isAuthenticated: false,
      };

    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
