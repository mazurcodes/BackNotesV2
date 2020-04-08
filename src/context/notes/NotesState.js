import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import { NOTES_API } from '../api';
import { GET_NOTES, NOTES_ERROR } from '../types';

const NotesState = ({ children }) => {
  const initialState = {
    notes: [
      { id: 1, title: 'Hello', desc: 'first file hehe :)' },
      { id: 2, title: 'Second hello', desc: 'first file hehe :)' },
      { id: 3, title: 'This is great', desc: 'first file hehe :)' },
      { id: 4, title: 'Awesome', desc: 'first file hehe :)' },
      { id: 5, title: 'yes. i am', desc: 'first file hehe :)' },
    ],
    filtered: [],
    current: null,
    error: '',
  };
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const fetchConfig = (method = 'GET', body) => {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
      body: body && JSON.stringify(body),
    };
  };

  // TODO: actions for notes state
  const getNotes = async () => {
    try {
      const response = await fetch(NOTES_API, fetchConfig('GET'));
      const notesData = await response.json();
      if (!response.ok) throw notesData.error;
      dispatch({
        type: GET_NOTES,
        payload: notesData,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: NOTES_ERROR,
        payload: err,
      });
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        filtered: state.filtered,
        current: state.current,
        error: state.error,
        getNotes,
      }}
    >
      <ContextDevTool context={NotesContext} id="notesContext" displayName="Notes Context" />
      {children}
    </NotesContext.Provider>
  );
};

NotesState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default NotesState;
