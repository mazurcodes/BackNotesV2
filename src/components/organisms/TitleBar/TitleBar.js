import React from 'react';
import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffc01f;
  height: 50px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 45px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    height: 30px;
  }
`;

const StyledTitle = styled(Heading)`
  color: white;
  font-size: 24px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 20px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 16px;
  }
`;

const TitleBar = () => {
  return (
    <StyledWrapper className="title-bar">
      <StyledTitle>User files</StyledTitle>
    </StyledWrapper>
  );
};

export default TitleBar;
