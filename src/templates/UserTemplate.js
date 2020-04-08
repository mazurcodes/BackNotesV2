import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavBar from '../components/organisms/NavBar/NavBar';
import EditBar from '../components/organisms/EditBar/EditBar';
import StatusBar from '../components/organisms/StatusBar/StatusBar';

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const UserTemplate = ({ children }) => {
  return (
    <StyledWrapper>
      <NavBar />
      <EditBar />
      {children}
      <StatusBar />
    </StyledWrapper>
  );
};

UserTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserTemplate;
