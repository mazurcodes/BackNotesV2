import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import { v1 as uuidv1 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

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
    if (typeof id !== 'string' && typeof time !== 'number') return;

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
   *      setAlert(alertObject);
   *
   */
  const setAlert = (alert) => {
    if (typeof alert !== 'string') return;
    const newAlert = {
      id: uuidv1(),
      msg: alert,
    };
    dispatch({
      type: SET_ALERT,
      payload: newAlert,
    });

    removeAlert(newAlert.id, 7000);
  };

  return (
    <AlertContext.Provider value={{ alerts: state.alerts, setAlert }}>
      <ContextDevTool context={AlertContext} id="alertContext" displayName="Alert Context" />
      {children}
    </AlertContext.Provider>
  );
};

AlertState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default AlertState;
