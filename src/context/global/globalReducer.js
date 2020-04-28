import { SET_PAGE, SET_REDIRECT, RESET_REDIRECT } from '../types';

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
    default:
      return state;
  }
};
