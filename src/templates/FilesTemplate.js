import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserTemplate from './UserTemplate';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 250px 50px 100px;
`;

const FilesTemplate = ({ children }) => {
  return (
    <UserTemplate>
      <StyledWrapper>{children}</StyledWrapper>
    </UserTemplate>
  );
};

FilesTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default FilesTemplate;
