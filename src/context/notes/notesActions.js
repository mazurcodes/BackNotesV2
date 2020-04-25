import mdIt from '../markdownIt';
import { notesApi, fetchConfig } from '../api';
import {
  GET_NOTES,
  NOTES_ERROR,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CLEAR_STATE,
  FILTER_NOTES,
  RENDER_CONTENT,
  UPDATE_CURRENT,
} from '../types';

export const renderContentAction = (content) => {
  const renderedContent = mdIt.render(content);
  return {
    type: RENDER_CONTENT,
    payload: renderedContent,
  };
};

export const getNotesAction = async () => {
  try {
    const response = await fetch(notesApi(), fetchConfig());
    const notesList = await response.json();
    if (!response.ok) throw notesList.error;
    return {
      type: GET_NOTES,
      payload: notesList,
    };
  } catch (err) {
    console.log('Get notes error: ', err);
    return {
      type: NOTES_ERROR,
      payload: err,
    };
  }
};

export const addNoteAction = async (note) => {
  try {
    const response = await fetch(notesApi(), fetchConfig('POST', note));
    const noteStatus = await response.json();
    if (!response.ok) throw noteStatus.error;
    const newNote = {
      ...note,
      id: noteStatus.id,
    };
    return {
      type: ADD_NOTE,
      payload: newNote,
    };
  } catch (err) {
    console.log('Add note error: ', err);
    return {
      type: NOTES_ERROR,
      payload: err,
    };
  }
};

export const deleteNoteAction = async (id) => {
  try {
    const response = await fetch(notesApi(id), fetchConfig('DELETE'));
    const noteData = await response.json();
    if (!response.ok) throw noteData.error;
    return {
      type: DELETE_NOTE,
      payload: id,
    };
  } catch (err) {
    console.log('Delete note error: ', err);
    return {
      type: NOTES_ERROR,
      payload: err,
    };
  }
};

export const updateNoteAction = async (note) => {
  try {
    const response = await fetch(notesApi(note.id), fetchConfig('PUT', note));
    const noteData = await response.json();
    if (!response.ok) throw noteData.error;
    return {
      type: UPDATE_NOTE,
      payload: note,
    };
  } catch (err) {
    console.log('Update note error: ', err);
    return {
      type: NOTES_ERROR,
      payload: err,
    };
  }
};

export const setCurrentAction = async (id) => {
  try {
    const response = await fetch(notesApi(id), fetchConfig());
    const note = await response.json();
    if (!response.ok) throw note.error;
    return {
      type: SET_CURRENT,
      payload: note,
    };
  } catch (err) {
    console.log('Set current file to edit error: ', err);
    return {
      type: NOTES_ERROR,
      payload: err,
    };
  }
};

export const updateCurrentAction = (noteFields) => {
  return {
    type: UPDATE_CURRENT,
    payload: noteFields,
  };
};

export const clearCurrentAction = (dispatch) => dispatch({ type: CLEAR_CURRENT });

export const filterNotesAction = (word, dispatch) =>
  dispatch({ type: FILTER_NOTES, payload: word });

export const clearFilterAction = (dispatch) => dispatch({ type: CLEAR_FILTER });

export const clearNotesStateAction = (dispatch) => dispatch({ type: CLEAR_STATE });
