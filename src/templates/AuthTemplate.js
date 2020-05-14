import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logos/backnotesv2.svg';
import Paragraph from '../components/atoms/Paragraph/Paragraph';
import AuthForm from '../components/organisms/AuthForm/AuthForm';
import routes from '../routes/routes';
import GlobalContext from '../context/global/globalContext';
import AuthContext from '../context/auth/authContext';
import Loader from '../components/atoms/Loader/Loader';
import AlertContext from '../context/alert/alertContext';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.blue};
`;

const StyledLogo = styled.img`
  width: 60%;
  max-width: 750px;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 20px 0;
  color: white;
  font-size: calc(1rem + 2vw);
  text-align: center;
`;

const AuthTemplate = () => {
  const [redirect, setRedirect] = useState(false);
  const onRedirect = () => setRedirect(true);

  const { currentPage, serverStatus, globalError } = useContext(GlobalContext);
  const { isAuthenticated, clearAuthError } = useContext(AuthContext);
  const { clearAlerts } = useContext(AlertContext);

  useEffect(() => {
    clearAlerts();
    clearAuthError();
    // eslint-disable-next-line
  }, []);

  if (isAuthenticated) return <Redirect to={routes.notes} />;
  if (redirect && currentPage === routes.register) return <Redirect push to={routes.login} />;
  if (redirect && currentPage === routes.login) return <Redirect push to={routes.register} />;
  return (
    <StyledWrapper>
      <StyledLogo src={logo} />
      <StyledParagraph>Your new favorite markdown editor</StyledParagraph>
      {serverStatus === 'up' && !localStorage.token && <AuthForm onRedirect={onRedirect} />}
      {serverStatus !== 'up' && <Loader server={serverStatus} error={globalError} />}
    </StyledWrapper>
  );
};

export default AuthTemplate;
