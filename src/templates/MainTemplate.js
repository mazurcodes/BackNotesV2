import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../theme/mainTheme';
import GlobalStyle from '../theme/GlobalStyle';
import GlobalContext from '../context/global/globalContext';
import AuthContext from '../context/auth/authContext';
import NotesContext from '../context/notes/notesContext';
import AlertContext from '../context/alert/alertContext';

const MainTemplate = ({ location, children }) => {
  const { setPage, checkServer } = useContext(GlobalContext);
  const { loadUser, authError } = useContext(AuthContext);
  const { notesError } = useContext(NotesContext);
  const { setAlert, clearAlerts } = useContext(AlertContext);

  // If token is already in localStorage load user from server

  useEffect(() => {
    checkServer();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.token && loadUser(localStorage.token);
    // eslint-disable-next-line
  }, [localStorage.token]);

  // Every change in current path must be reported to global state
  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    authError && setAlert(authError);
    !authError && clearAlerts();
    // eslint-disable-next-line
  }, [authError]);

  useEffect(() => {
    notesError && setAlert(notesError);
    // eslint-disable-next-line
  }, [notesError]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    </>
  );
};

MainTemplate.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

export default withRouter(MainTemplate);
