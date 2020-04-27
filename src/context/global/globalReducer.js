import { SET_PAGE, SET_REDIRECT } from '../types';

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
    default:
      return state;
  }
};
