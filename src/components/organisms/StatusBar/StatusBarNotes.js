import React, { useContext } from 'react';
import styled from 'styled-components';
import NotesContext from '../../../context/notes/notesContext';
import Paragraph from '../../atoms/Paragraph/Paragraph';

export const StyledWrapper = styled.div`
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

export const StyledStatus = styled(Paragraph)`
  color: white;
  font-size: 12px;
  margin-right: 10px;
`;

export const StyledData = styled.span`
  font-weight: ${({ theme }) => theme.bold};
`;

const StatusBarNotes = () => {
  const { notes } = useContext(NotesContext);

  if (!notes[0]) return null;

  const { title, date } = notes[0];

  const formatDate = (dateStr) => {
    if (!date) return '';
    const dateObj = new Date(dateStr);
    const dateString = dateObj.toLocaleDateString();
    return dateString;
  };

  return (
    <StyledWrapper>
      <StyledStatus>
        Notes: <StyledData>{notes.length}</StyledData>
      </StyledStatus>
      <StyledStatus>
        Last created: <StyledData>{title} -</StyledData> {formatDate(date)}
      </StyledStatus>
    </StyledWrapper>
  );
};

export default StatusBarNotes;
