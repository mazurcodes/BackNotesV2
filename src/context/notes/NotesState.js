import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';

const NotesState = ({ children }) => {
  const initialState = {
    notes: [],
    filtered: [],
    current: null,
    error: '',
  };
  const { state, dispatch } = useReducer(notesReducer, initialState);

  // TODO: actions for notes state
  dispatch();

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        filtered: state.filtered,
        current: state.current,
        error: state.error,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

NotesState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default NotesState;
