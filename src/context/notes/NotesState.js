import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import { NOTES_API } from '../api';
import { GET_NOTES, NOTES_ERROR, ADD_NOTE, DELETE_NOTE, UPDATE_NOTE, SET_CURRENT } from '../types';
import { setSmthgAction } from './notesActions';

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

  /**
   * Configures Notes API path.
   *
   * Accepts optional string argument 'id'
   *
   * Examples:
   *     notesApi();
   *     notesApi(id);
   *     notesApi('12345ffd44');
   */
  const notesApi = (id = '') => {
    return `${NOTES_API}/${id}`;
  };

  /**
   * Returns configuration object for fetch() method.
   *
   * Accepts params 'method' and {body}:
   *
   *      fetchConfig('POST')
   *      fetchConfig('DELETE')
   *      fetchConfig('PUT', {title: 'hello', desc: 'this is hello'})
   *
   */
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

  /**
   * Context action for fetching all user notes.
   *
   * Example:
   *
   *      getNotes()
   *
   * Accepts no arguments
   */
  const getNotes = async () => {
    try {
      const response = await fetch(notesApi(), fetchConfig());
      const notesList = await response.json();
      if (!response.ok) throw notesList.error;
      dispatch({
        type: GET_NOTES,
        payload: notesList,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: NOTES_ERROR,
        payload: err,
      });
    }
  };

  /**
   * Context action for sending new note to DB.
   *
   * Example:
   *
   *      addNote(note)
   *      addNote({title: 'hello', desc: 'yo', content: 'hey'})
   *
   */
  const addNote = async (note) => {
    try {
      const response = await fetch(notesApi(), fetchConfig('POST', note));
      const noteData = await response.json();
      if (!response.ok) throw noteData.error;
      dispatch({
        type: ADD_NOTE,
        payload: noteData,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: NOTES_ERROR,
        payload: err,
      });
    }
  };

  /**
   * Context action for deleting note in DB.
   *
   * Example:
   *
   *      deleteNote(id)
   *      deleteNote('a12344232dfdf534')
   *
   */
  const deleteNote = async (id) => {
    try {
      const response = await fetch(notesApi(id), fetchConfig('DELETE'));
      const noteData = await response.json();
      if (!response.ok) throw noteData.error;
      dispatch({
        type: DELETE_NOTE,
        payload: id,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: NOTES_ERROR,
        payload: err,
      });
    }
  };

  /**
   * Context action for updating note in DB.
   *
   * Example:
   *
   *      updateNote(note)
   *      updateNote({title: 'hello', desc: 'yo', content: 'hey'})
   *
   */
  const updateNote = async (note) => {
    try {
      const response = await fetch(notesApi(note.id), fetchConfig('PUT', note));
      const noteData = await response.json();
      if (!response.ok) throw noteData.error;
      dispatch({
        type: UPDATE_NOTE,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: NOTES_ERROR,
        payload: err,
      });
    }
  };

  /**
   * Context action for downloading single note from DB.
   *
   * Setting this note as current in state.
   *
   * Example:
   *
   *      setCurrent(id)
   *      setCurrent('sd2345frt')
   *
   */
  const setCurrent = async (id) => {
    try {
      const response = await fetch(notesApi(id), fetchConfig());
      const note = await response.json();
      if (!response.ok) throw note.error;
      dispatch({
        type: SET_CURRENT,
        payload: note,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: NOTES_ERROR,
        payload: err,
      });
    }
  };

  // TODO: actions for notes state

  /**
   * Context action for clearing current note in state.
   *
   * Example:
   *
   *      clearCurrent()
   *
   */
  const clearCurrent = () => dispatch();

  /**
   * Context action for filtering notes in state.
   *
   * Example:
   *
   *      filterNotes(word)
   *      filterNotes('hello')
   *
   */
  const filterNotes = () => {};

  /**
   * Context action for filtering notes in state.
   *
   * Example:
   *
   *      clearFilter()
   *
   */
  const clearFilter = () => {};

  /**
   * Context action for return to initial state.
   *
   * Example:
   *
   *      clearNotes()
   *
   */
  const clearNotes = () => {};

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        filtered: state.filtered,
        current: state.current,
        error: state.error,
        getNotes,
        addNote,
        deleteNote,
        updateNote,
        setCurrent,
        clearCurrent,
        filterNotes,
        clearFilter,
        clearNotes,
        setSmthg: (id) => setSmthgAction(id, dispatch),
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
