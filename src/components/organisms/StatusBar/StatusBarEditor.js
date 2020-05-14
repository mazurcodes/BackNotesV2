import React, { useContext } from 'react';
import styled from 'styled-components';
import NotesContext from '../../../context/notes/notesContext';
import Paragraph from '../../atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #3a94d4;
  height: 20px;
  width: 100%;
  padding: 0 20px;
`;

const StyledBarWrapper = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    &:nth-of-type(2) {
      display: none;
    }
  }
`;

const StyledStatus = styled(Paragraph)`
  color: white;
  font-size: 12px;
  margin-right: 10px;
`;

const StyledData = styled.span`
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledSaveStatus = styled(Paragraph)`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  color: ${({ saveStatus }) => (saveStatus === 'Saving...' ? '#FF7B51' : '#5FD417')};
  background-color: white;
  border: 1px solid rgb(240, 240, 240);
  padding: 3px;
`;

const StatusBarEditor = () => {
  const { htmlStats, markdownStats, saveStatus } = useContext(NotesContext);

  const { lines, words, letters } = htmlStats;

  if (!htmlStats) return <StyledWrapper />;
  if (!markdownStats) return <StyledWrapper />;

  return (
    <StyledWrapper>
      <StyledBarWrapper>
        <StyledStatus>Markdown:</StyledStatus>
        <StyledStatus>
          <StyledData>{markdownStats.lines}</StyledData> lines
        </StyledStatus>
        <StyledStatus>
          <StyledData>{markdownStats.words}</StyledData> words
        </StyledStatus>
        <StyledStatus>
          <StyledData>{markdownStats.letters}</StyledData> letters
        </StyledStatus>
      </StyledBarWrapper>
      <StyledSaveStatus saveStatus={saveStatus}>{saveStatus}</StyledSaveStatus>
      <StyledBarWrapper>
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
      </StyledBarWrapper>
    </StyledWrapper>
  );
};

export default StatusBarEditor;
