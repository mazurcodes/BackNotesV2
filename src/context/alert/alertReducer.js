import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    case CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
      };
    default:
      return state;
  }
};
