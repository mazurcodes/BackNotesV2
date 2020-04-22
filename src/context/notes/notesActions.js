import xss from 'xss';
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

export const getNotesAction = async (dispatch) => {
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

export const addNoteAction = async (note, dispatch) => {
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

export const deleteNoteAction = async (id, dispatch) => {
  console.log(notesApi(id));
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

export const updateNoteAction = async (note, dispatch) => {
  try {
    const response = await fetch(notesApi(note.id), fetchConfig('PUT', note));
    const noteData = await response.json();
    if (!response.ok) throw noteData.error;
    dispatch({
      type: UPDATE_NOTE,
    });
  } catch (err) {
    console.log('Update note error: ', err);
    dispatch({
      type: NOTES_ERROR,
      payload: err,
    });
  }
};

const renderAndSanitizeContent = (content, dispatch) => {
  console.log(content);
  if (!content) return;
  const renderedContent = mdIt.render(content);
  const sanitizedContent = xss(renderedContent);
  dispatch({
    type: RENDER_CONTENT,
    payload: sanitizedContent,
  });
};

export const setCurrentAction = async (id, dispatch) => {
  try {
    const response = await fetch(notesApi(id), fetchConfig());
    const note = await response.json();
    if (!response.ok) throw note.error;
    dispatch({
      type: SET_CURRENT,
      payload: note,
    });
    renderAndSanitizeContent(note.content, dispatch);
  } catch (err) {
    console.log('Set current file to edit error: ', err);
    dispatch({
      type: NOTES_ERROR,
      payload: err,
    });
  }
};

export const updateCurrentAction = (noteFields, dispatch) => {
  dispatch({
    type: UPDATE_CURRENT,
    payload: noteFields,
  });
  console.log(noteFields.content);
  renderAndSanitizeContent(noteFields.content, dispatch);
  // TODO: Action for setTimeout updateNote
};

export const clearCurrentAction = (dispatch) => dispatch({ type: CLEAR_CURRENT });

export const filterNotesAction = (word, dispatch) =>
  dispatch({ type: FILTER_NOTES, payload: word });

export const clearFilterAction = (dispatch) => dispatch({ type: CLEAR_FILTER });

export const clearNotesStateAction = (dispatch) => dispatch({ type: CLEAR_STATE });
