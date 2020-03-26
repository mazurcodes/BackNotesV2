import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import GlobalContext from './globalContext';
import globalReducer from './globalReducer';
import { SET_PAGE } from '../types';

const GlobalState = ({ children }) => {
  const initialState = {
    currentPAge: '',
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setPage = (page) => {
    dispatch({
      type: SET_PAGE,
      payload: page,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        currentPage: state.currentPage,
        setPage,
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
