import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import editBigIcon from '../../../assets/icons/icon-big-edit.svg';
import previewBigIcon from '../../../assets/icons/icon-big-open.svg';
import closeBigIcon from '../../../assets/icons/icon-big-close.svg';
import GlobalContext from '../../../context/global/globalContext';
import routes from '../../../routes/routes';

const StyledButtonIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 100px;
  height: 100px;
  margin-top: 20px;
  border-radius: 50%;
  transition: transform 0.3s;
  border: none;
`;

const ButtonIconPanel = ({ preview, editor }) => {
  const { setDestination } = useContext(GlobalContext);
  return (
    <StyledButtonIconContainer>
      {preview && (
        <StyledButtonIcon icon={editBigIcon} onClick={() => setDestination(routes.editor)} />
      )}
      {editor && (
        <StyledButtonIcon icon={previewBigIcon} onClick={() => setDestination(routes.preview)} />
      )}
      <StyledButtonIcon icon={closeBigIcon} onClick={() => setDestination(routes.notes)} />
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
