import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import GlobalContext from './globalContext';
import globalReducer from './globalReducer';
import { SET_PAGE, SET_REDIRECT } from '../types';

const GlobalState = ({ children }) => {
  const initialState = {
    currentPage: '',
    redirectTo: '',
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

  return (
    <GlobalContext.Provider
      value={{
        currentPage: state.currentPage,
        redirectTo: state.redirectTo,
        setPage,
        setDestination,
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
