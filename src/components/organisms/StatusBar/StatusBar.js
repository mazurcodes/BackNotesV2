import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #3a94d4;
  height: 20px;
  width: 100%;
`;

const StyledStatus = styled(Paragraph)`
  color: white;
  font-size: 12px;
  margin-right: 20px;
`;

const StyledData = styled.span`
  font-weight: ${({ theme }) => theme.bold};
`;

const StatusBar = () => {
  return (
    <StyledWrapper>
      <StyledStatus>
        Files: <StyledData>17</StyledData>
      </StyledStatus>
      <StyledStatus>
        Latest: <StyledData>18.03.2020</StyledData>
      </StyledStatus>
    </StyledWrapper>
  );
};

export default StatusBar;
