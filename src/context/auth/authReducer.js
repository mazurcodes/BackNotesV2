import { REGISTER_SUCCESS, LOGIN_SUCCESS, REGISTER_FAIL, LOGIN_FAIL } from '../types';

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
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
