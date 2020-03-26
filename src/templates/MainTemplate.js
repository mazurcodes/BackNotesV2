import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../theme/mainTheme';
import GlobalStyle from '../theme/GlobalStyle';
import GlobalContext from '../context/global/globalContext';

const MainTemplate = ({ location, children }) => {
  const { setPage } = useContext(GlobalContext);

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, [location]);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    </>
  );
};

MainTemplate.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.element.isRequired,
};

export default withRouter(MainTemplate);
