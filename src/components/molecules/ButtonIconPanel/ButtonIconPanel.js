import React from 'react';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import editBigIcon from '../../../assets/icons/icon-big-edit.svg';
import previewBigIcon from '../../../assets/icons/icon-big-open.svg';
import closeBigIcon from '../../../assets/icons/icon-big-close.svg';

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

const ButtonIconPanel = () => {
  return (
    <StyledButtonIconContainer>
      <StyledButtonIcon icon={editBigIcon} />
      <StyledButtonIcon icon={previewBigIcon} />
      <StyledButtonIcon icon={closeBigIcon} />
    </StyledButtonIconContainer>
  );
};

export default ButtonIconPanel;
