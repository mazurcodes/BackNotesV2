import React, { useContext } from 'react';
import styled from 'styled-components';
import notesContext from '../../../context/notes/notesContext';
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
  padding: 0 20px;
`;

const StyledStatus = styled(Paragraph)`
  color: white;
  font-size: 12px;
  margin-right: 10px;
`;

const StyledData = styled.span`
  font-weight: ${({ theme }) => theme.bold};
`;

const StatusBarPreview = () => {
  const {
    htmlStats: { lines, words, letters },
  } = useContext(notesContext);

  return (
    <StyledWrapper>
      <StyledStatus>HTML:</StyledStatus>
      <StyledStatus>
        <StyledData>{lines}</StyledData> lines
      </StyledStatus>
      <StyledStatus>
        <StyledData>{words}</StyledData> words
      </StyledStatus>
      <StyledStatus>
        <StyledData>{letters}</StyledData> letters
      </StyledStatus>
    </StyledWrapper>
  );
};

export default StatusBarPreview;
