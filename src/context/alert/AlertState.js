import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../types';

const AlertState = ({ children }) => {
  const initialState = {
    alerts: [],
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  /**
   * Alert context action for removing alert after some time.
   *
   * Example:
   *
   *      removeAlert(alertId, timeoutTime);
   *
   */
  const removeAlert = (id, time) => {
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      time,
    );
  };

  /**
   * Alert context action for creating alert.
   *
   * Example:
   *
   *      setAlert(errorObject);
   *
   */
  const setAlert = (error) => {
    dispatch({
      type: SET_ALERT,
      payload: error,
    });

    removeAlert(error.id, 5000);
  };

  const clearAlerts = () => {
    dispatch({
      type: CLEAR_ALERTS,
    });
  };

  return (
    <AlertContext.Provider value={{ alerts: state.alerts, setAlert, clearAlerts }}>
      <ContextDevTool context={AlertContext} id="alertContext" displayName="Alert Context" />
      {children}
    </AlertContext.Provider>
  );
};

AlertState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default AlertState;
