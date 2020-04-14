import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserTemplate from './UserTemplate';
import ListBar from '../components/molecules/ListBar/ListBar';
import ButtonIcon from '../components/atoms/ButtonIcon/ButtonIcon';
import addIcon from '../assets/icons/icon-add.svg';

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
`;

const FilesTemplate = ({ children }) => {
  return (
    <UserTemplate>
      <StyledWrapper>
        <ListBar />
        {children}
      </StyledWrapper>
      <StyledButtonIcon icon={addIcon} />
    </UserTemplate>
  );
};

FilesTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default FilesTemplate;
