import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_NOTES,
  CLEAR_FILTER,
  CLEAR_STATE,
  NOTES_ERROR,
  RENDER_CONTENT,
  UPDATE_CURRENT,
  SET_MARKDOWN_STATS,
  SET_HTML_STATS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        current: action.payload,
        initialCurrentValues: action.payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => (note.id === action.payload.id ? action.payload : note)),
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        initialCurrentValues: action.payload,
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload,
        },
      };
    case SET_MARKDOWN_STATS:
      return {
        ...state,
        markdownStats: action.payload,
      };
    case SET_HTML_STATS:
      return {
        ...state,
        htmlStats: action.payload,
      };
    case RENDER_CONTENT:
      return {
        ...state,
        renderedContent: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_NOTES:
      return {
        ...state,
        filtered: state.notes.filter(
          (note) =>
            note.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            note.description.toLowerCase().includes(action.payload.toLowerCase()),
        ),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: [],
      };
    case CLEAR_STATE:
      return {
        ...state,
        notes: [],
        filtered: [],
        current: null,
        renderedContent: null,
        error: '',
      };
    case NOTES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case 'DEMO':
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
