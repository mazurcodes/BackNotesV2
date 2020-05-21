import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import editBigIcon from '../../../assets/icons/icon-big-edit.svg';
import editSmallIcon from '../../../assets/icons/icon-small-edit.svg';
import previewBigIcon from '../../../assets/icons/icon-big-open.svg';
import previewSmallIcon from '../../../assets/icons/icon-small-open.svg';
import closeBigIcon from '../../../assets/icons/icon-big-close.svg';
import closeSmallIcon from '../../../assets/icons/icon-small-close.svg';
import GlobalContext from '../../../context/global/globalContext';
import routes from '../../../routes/routes';
import NotesContext from '../../../context/notes/notesContext';

const StyledButtonIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 50px;
  right: 50px;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    right: 30px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    bottom: 40px;
    right: 20px;
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 100px;
  height: 100px;
  margin-top: 20px;
  border-radius: 50%;
  transition: transform 0.3s;
  border: none;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 50px;
    height: 50px;
    margin-top: 15px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
  }
`;

const ButtonIconPanel = ({ preview, editor }) => {
  const { setDestination } = useContext(GlobalContext);
  const { setInitialCurrent } = useContext(NotesContext);

  const handleRedirect = (route) => {
    return () => {
      setInitialCurrent();
      setDestination(route);
    };
  };

  return (
    <StyledButtonIconContainer>
      {preview && (
        <StyledButtonIcon
          icon={editBigIcon}
          smallIcon={editSmallIcon}
          onClick={handleRedirect(routes.editor)}
        />
      )}

      {editor && (
        <StyledButtonIcon
          icon={previewBigIcon}
          smallIcon={previewSmallIcon}
          onClick={handleRedirect(routes.preview)}
        />
      )}

      <StyledButtonIcon
        icon={closeBigIcon}
        smallIcon={closeSmallIcon}
        onClick={handleRedirect(routes.notes)}
      />
    </StyledButtonIconContainer>
  );
};

ButtonIconPanel.propTypes = {
  preview: PropTypes.bool,
  editor: PropTypes.bool,
};

ButtonIconPanel.defaultProps = {
  preview: false,
  editor: false,
};

export default ButtonIconPanel;
