// Notes API path
export const NOTES_API = 'http://localhost:5000/markdown';

// Authorization API path
export const AUTH_API = 'http://localhost:5000/auth';

// Registration API path
export const REG_API = 'http://localhost:5000/users';

/**
 * Configures Notes API path.
 *
 * Accepts optional string argument 'id'
 *
 * Examples:
 *
 *     notesApi();
 *     notesApi(id);
 *     notesApi('12345ffd44');
 */
export const notesApi = (id = '') => {
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
export const fetchConfig = (method = 'GET', body) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
    body: body && JSON.stringify(body),
  };
};
