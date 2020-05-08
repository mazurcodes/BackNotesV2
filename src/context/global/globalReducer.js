import { SET_PAGE, SET_REDIRECT, RESET_REDIRECT, SERVER_UP, SERVER_DOWN } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirectTo: action.payload,
      };
    case RESET_REDIRECT:
      return {
        ...state,
        redirectTo: '',
      };
    case SERVER_UP:
      return {
        ...state,
        serverStatus: 'up',
      };
    case SERVER_DOWN:
      return {
        ...state,
        serverStatus: 'down',
        error: "We're sorry. Server is down...",
      };
    default:
      return state;
  }
};
