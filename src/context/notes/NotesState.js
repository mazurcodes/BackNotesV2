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
  clearStateAction,
} from './notesActions';

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
   *      updateNote({title: 'hello', desc: 'yo', content: 'hey'})
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
   *      clearNotes()
   *
   */
  const clearState = () => clearStateAction(dispatch);

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
        clearState,
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
