import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextDevTool from 'react-context-devtool';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import {
  getNotesAction,
  addNoteAction,
  deleteNoteAction,
  updateNoteAction,
  setCurrentAction,
  updateCurrentAction,
  renderContentAction,
} from './notesActions';
import { SET_TIMEOUT, CLEAR_CURRENT, FILTER_NOTES, CLEAR_FILTER, CLEAR_STATE } from '../types';

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
   * Helper function rendering HTML
   * state.current.content (markdown) >>> state.renderedContent (HTML)
   *
   */
  useEffect(() => {
    if (!state.current) return;
    const result = renderContentAction(state.current.content);
    dispatch(result);
    // eslint-disable-next-line
  }, [state.current]);

  /**
   * Context action for fetching all user notes.
   *
   * Example:
   *
   *      getNotes()
   *
   * Accepts no arguments
   */
  const getNotes = () => getNotesAction().then((result) => dispatch(result));

  /**
   * Context action for sending new note to DB.
   *
   * Example:
   *
   *      addNote(note)
   *      addNote({title: 'hello', desc: 'yo', content: 'hey'})
   *
   */
  const addNote = (note) => addNoteAction(note).then((result) => dispatch(result));

  /**
   * Context action for deleting note in DB.
   *
   * Example:
   *
   *      deleteNote(id)
   *      deleteNote('a12344232dfdf534')
   *
   */
  const deleteNote = (id) => deleteNoteAction(id).then((result) => dispatch(result));

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
  const updateNote = (note) => updateNoteAction(note).then((result) => dispatch(result));

  /**
   * Auto save helper
   */
  useEffect(() => {
    const autosaveTime = 3000;
    if (state.current) {
      clearTimeout(state.timeoutIndex);
      const timeIndex = setTimeout(() => updateNote(state.current), autosaveTime);
      dispatch({
        type: SET_TIMEOUT,
        payload: timeIndex,
      });
    }
    // eslint-disable-next-line
  }, [state.current]);

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
  const setCurrent = (id) => setCurrentAction(id).then((result) => dispatch(result));

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
  const updateCurrent = (note) => {
    const result = updateCurrentAction(note);
    dispatch(result);
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
