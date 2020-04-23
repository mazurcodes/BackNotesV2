import React, { useReducer } from 'react';
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
  clearCurrentAction,
  filterNotesAction,
  clearFilterAction,
  clearNotesStateAction,
  updateCurrentAction,
  autosaveAction,
} from './notesActions';

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
   * Context action for fetching all user notes.
   *
   * Example:
   *
   *      getNotes()
   *
   * Accepts no arguments
   */
  const getNotes = () => getNotesAction(dispatch);

  /**
   * Context action for sending new note to DB.
   *
   * Example:
   *
   *      addNote(note)
   *      addNote({title: 'hello', desc: 'yo', content: 'hey'})
   *
   */
  const addNote = (note) => addNoteAction(note, dispatch);

  /**
   * Context action for deleting note in DB.
   *
   * Example:
   *
   *      deleteNote(id)
   *      deleteNote('a12344232dfdf534')
   *
   */
  const deleteNote = (id) => deleteNoteAction(id, dispatch);

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
  const updateNote = (note) => updateNoteAction(note, dispatch);

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
  const setCurrent = (id) => setCurrentAction(id, dispatch);

  /**
   * Context action for updatinf current note in state.
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
  const updateCurrent = (note) => updateCurrentAction(note, state, dispatch);

  const autosaveNote = (time) =>
    autosaveAction(state.timeoutIndex, time, () => updateNote(state.current), dispatch);
  /**
   * Context action for clearing current note in state.
   *
   * Example:
   *
   *      clearCurrent()
   *
   */
  const clearCurrent = () => clearCurrentAction(dispatch);

  /**
   * Context action for filtering notes in state.
   *
   * Example:
   *
   *      filterNotes(word)
   *      filterNotes('hello')
   *
   */
  const filterNotes = (word) => filterNotesAction(word, dispatch);

  /**
   * Context action for filtering notes in state.
   *
   * Example:
   *
   *      clearFilter()
   *
   */
  const clearFilter = () => clearFilterAction(dispatch);

  /**
   * Context action for return to initial state.
   *
   * Example:
   *
   *      clearNotesState()
   *
   */
  const clearNotesState = () => clearNotesStateAction(dispatch);

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
        autosaveNote,
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
