import React from 'react';
import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffc01f;
  height: 50px;
`;

const StyledTitle = styled(Heading)`
  color: white;
  font-size: 24px;
`;

const TitleBar = () => {
  return (
    <StyledWrapper>
      <StyledTitle>User files</StyledTitle>
    </StyledWrapper>
  );
};

export default TitleBar;
