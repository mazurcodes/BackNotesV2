import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import mdIt from '../markdownIt';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import {
  SET_TIMEOUT,
  CLEAR_CURRENT,
  FILTER_NOTES,
  CLEAR_FILTER,
  CLEAR_STATE,
  GET_NOTES,
  NOTES_ERROR,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_CURRENT,
  UPDATE_CURRENT,
  RENDER_CONTENT,
} from '../types';
import { notesApi, fetchConfig } from '../api';

const NotesState = ({ children }) => {
  const initialState = {
    notes: [],
    filtered: [],
    current: null,
    initialCurrentValues: null,
    renderedContent: null,
    timeoutIndex: 0,
    error: '',
  };

  const [state, dispatch] = useReducer(notesReducer, initialState);

  /**
   *****************************************************************************************
   *
   *                                         ACTIONS
   *
   *****************************************************************************************
   */

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
      console.log('Get notes error: ', err);
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
      const noteStatus = await response.json();
      if (!response.ok) throw noteStatus.error;
      const newNote = {
        ...note,
        id: noteStatus.id,
      };
      dispatch({
        type: ADD_NOTE,
        payload: newNote,
      });
    } catch (err) {
      console.log('Add note error: ', err);
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
      console.log('Delete note error: ', err);
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
   *      updateNote({
   *        id: '5dfgdf4354353dgfsdfs',
   *        title: 'hello',
   *        desc: 'yo',
   *        content: 'hey'
   *      })
   *
   */
  const updateNote = async (note) => {
    try {
      const response = await fetch(notesApi(note.id), fetchConfig('PUT', note));
      const noteData = await response.json();
      if (!response.ok) throw noteData.error;
      dispatch({
        type: UPDATE_NOTE,
        payload: note,
      });
    } catch (err) {
      console.log('Update note error: ', err);
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
      console.log('Set current file to edit error: ', err);
      dispatch({
        type: NOTES_ERROR,
        payload: err,
      });
    }
  };

  /**
   * Context action for updating current note in state.
   *
   * Example:
   *
   *      updateCurrent(note);
   *      updateCurrent({
   *        id: '5dfgdf4354353dgfsdfs',
   *        title: 'hello',
   *        desc: 'yo',
   *        content: 'hey'
   *      })
   *
   */
  const updateCurrent = (noteFields) => dispatch({ type: UPDATE_CURRENT, payload: noteFields });

  /**
   * Context action for updating current note in state.
   *
   * Example:
   *
   *      updateCurrent(note);
   *      updateCurrent({
   *        id: '5dfgdf4354353dgfsdfs',
   *        title: 'hello',
   *        desc: 'yo',
   *        content: 'hey'
   *      })
   *
   */
  const renderContent = (content) => {
    const renderedContent = mdIt.render(content);
    dispatch({
      type: RENDER_CONTENT,
      payload: renderedContent,
    });
  };
  /**
   * Context action for clearing current note in state.
   *
   * Example:
   *
   *      clearCurrent()
   *
   */
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  /**
   * Context action for filtering notes in state.
   *
   * Example:
   *
   *      filterNotes(word)
   *      filterNotes('hello')
   *
   */
  const filterNotes = (word) => dispatch({ type: FILTER_NOTES, payload: word });

  /**
   * Context action for filtering notes in state.
   *
   * Example:
   *
   *      clearFilter()
   *
   */
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  /**
   * Context action for return to initial state.
   *
   * Example:
   *
   *      clearNotesState()
   *
   */
  const clearNotesState = () => dispatch({ type: CLEAR_STATE });

  /**
   *****************************************************************************************
   *
   *                                         HELPERS
   *
   *****************************************************************************************
   */

  /**
   * Helper function for rendering HTML
   * state.current.content (markdown) >>> state.renderedContent (HTML)
   *
   */
  useEffect(() => {
    if (!state.current) return;
    renderContent(state.current.content);
    // eslint-disable-next-line
  }, [state.current]);

  /**
   * Helper function for timeout autosaving
   */
  useEffect(() => {
    if (!state.current) return;
    const autosaveTime = 3000;
    clearTimeout(state.timeoutIndex);
    const timeIndex = setTimeout(() => updateNote(state.current), autosaveTime);
    dispatch({
      type: SET_TIMEOUT,
      payload: timeIndex,
    });
    // eslint-disable-next-line
  }, [state.current]);

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        filtered: state.filtered,
        current: state.current,
        timeoutIndex: state.timeoutIndex,
        initialCurrentValues: state.initialCurrentValues,
        renderedContent: state.renderedContent,
        error: state.error,
        getNotes,
        addNote,
        deleteNote,
        updateNote,
        setCurrent,
        updateCurrent,
        clearCurrent,
        filterNotes,
        clearFilter,
        clearNotesState,
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
