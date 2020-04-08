import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserTemplate from './UserTemplate';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
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
