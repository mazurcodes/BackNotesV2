import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserTemplate from './UserTemplate';
import ListBar from '../components/molecules/ListBar/ListBar';
import ButtonIcon from '../components/atoms/ButtonIcon/ButtonIcon';
import addIcon from '../assets/icons/icon-add.svg';
import NewItemPanel from '../components/organisms/NewItemPanel/NewItemPanel';

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 30px 250px 50px 100px;
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
