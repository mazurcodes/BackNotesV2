import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import GlobalContext from './globalContext';
import globalReducer from './globalReducer';
import { SET_PAGE, SET_REDIRECT, RESET_REDIRECT, SERVER_UP, SERVER_DOWN } from '../types';
import { HEALTH_UP_API } from '../api';

const GlobalState = ({ children }) => {
  const initialState = {
    currentPage: '',
    redirectTo: '',
    serverStatus: '',
    error: '',
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setPage = (page) => {
    dispatch({
      type: SET_PAGE,
      payload: page,
    });
  };

  const setDestination = (route) => {
    dispatch({
      type: SET_REDIRECT,
      payload: route,
    });
  };

  const resetDestination = () => {
    dispatch({ type: RESET_REDIRECT });
  };

  useEffect(() => {
    if (!state.redirectTo) return;
    resetDestination();
  }, [state.redirectTo]);

  const checkServer = async () => {
    try {
      const response = await fetch(HEALTH_UP_API);
      if (!response.ok) throw response.statusText;
      dispatch({
        type: SERVER_UP,
      });
    } catch (err) {
      dispatch({
        type: SERVER_DOWN,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        currentPage: state.currentPage,
        redirectTo: state.redirectTo,
        serverStatus: state.serverStatus,
        globalError: state.error,
        setPage,
        setDestination,
        checkServer,
      }}
    >
      <ContextDevTool context={GlobalContext} id="globalContext" displayName="Global Context" />
      {children}
    </GlobalContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GlobalState;
