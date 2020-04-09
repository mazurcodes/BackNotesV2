import { SET_CURRENT, NOTES_ERROR } from '../types';

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
export const setSmthgAction = async (id, dispatch) => {
  console.log(id);
  try {
    dispatch({
      type: SET_CURRENT,
      payload: { title: '3434343', desc: 'dfdfdf' },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: NOTES_ERROR,
      payload: err,
    });
  }
};
