import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserTemplate from './UserTemplate';
import ListBar from '../components/molecules/ListBar/ListBar';
import ButtonIcon from '../components/atoms/ButtonIcon/ButtonIcon';
import addIcon from '../assets/icons/icon-add.svg';
import addSmallIcon from '../assets/icons/icon-small-add.svg';
import NewItemPanel from '../components/organisms/NewItemPanel/NewItemPanel';

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 30px 250px 50px 100px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    padding: 20px 30px 40px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    padding: 20px 30px 40px;
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 50px;
  right: 50px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  transform: ${({ active }) => active && 'rotate(-225deg)'};
  transition: transform 0.3s;
  border: none;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 50px;
    width: 50px;
    bottom: 40px;
    right: 25px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    height: 50px;
    width: 50px;
    bottom: 40px;
    right: 25px;
  }
`;

const FilesTemplate = ({ children }) => {
  const [state, setState] = useState({ isNewItemPanelActive: false });

  const onAddNewItem = () => setState({ isNewItemPanelActive: !state.isNewItemPanelActive });

  return (
    <UserTemplate>
      <StyledWrapper>
        <ListBar />
        {children}
        <NewItemPanel isActive={state.isNewItemPanelActive} panelToggle={onAddNewItem} />
        <StyledButtonIcon
          icon={addIcon}
          smallIcon={addSmallIcon}
          onClick={onAddNewItem}
          active={state.isNewItemPanelActive}
        />
      </StyledWrapper>
    </UserTemplate>
  );
};

FilesTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default FilesTemplate;
