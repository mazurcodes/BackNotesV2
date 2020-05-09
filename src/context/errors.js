import { v1 as uuidv1 } from 'uuid';

export const LOGIN_ERROR = 'Login';
export const REGISTER_ERROR = 'Register';
export const USER_ERROR = 'User';

export const GET_NOTES_ERROR = 'User notes';
export const ADD_NOTE_ERROR = 'New note';
export const DELETE_NOTE_ERROR = 'Delete';
export const UPDATE_NOTE_ERROR = 'Update';
export const CURRENT_NOTE_ERROR = 'Note';

/**
 * Helper function for creating error object.
 *
 * Example:
 *
 *      createError(type, message);
 *      createError('Login', 'invalid email');
 *
 */
const createError = (type, msg) => {
  if (typeof type !== 'string' && typeof msg !== 'string')
    throw new Error('invalid type argument...');

  return { id: uuidv1(), type, msg };
};

export default createError;
