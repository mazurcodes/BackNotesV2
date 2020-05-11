import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logos/backnotesv2.svg';
import logoutIcon from '../../../assets/icons/logout.svg';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import NotesContext from '../../../context/notes/notesContext';
import AuthContext from '../../../context/auth/authContext';

const StyledWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.blue};
  height: 70px;
  padding: 0 55px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    padding: 0 40px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    padding: 0 20px;
  }
`;

const StyledLogo = styled.img`
  height: 43px;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 43px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    height: 35px;
  }
`;

const StyledUserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledParagraph = styled(Paragraph)`
  color: white;
  margin-right: 20px;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    display: none;
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  :hover {
    border: 2px solid white;
  }
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 30px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    height: 30px;
  }
`;

const NavBar = React.memo(() => {
  const { user, logout } = useContext(AuthContext);
  const { clearNotesState } = useContext(NotesContext);
  const onLogout = () => {
    clearNotesState();
    logout();
  };
  return (
    <StyledWrapper className="navbar">
      <StyledLogo src={logo} />
      <StyledUserWrapper>
        <StyledParagraph>Welcome, {user && user.name}</StyledParagraph>
        <StyledButtonIcon icon={logoutIcon} onClick={onLogout} />
      </StyledUserWrapper>
    </StyledWrapper>
  );
});

export default NavBar;
