import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import markdownLogo from '../../../assets/logos/react.png';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import openIcon from '../../../assets/icons/icon-open.svg';
import editIcon from '../../../assets/icons/icon-edit.svg';
import deleteIcon from '../../../assets/icons/icon-delete.svg';
import NotesContext from '../../../context/notes/notesContext';
import routes from '../../../routes/routes';
import globalContext from '../../../context/global/globalContext';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  height: 100px;
  padding: 10px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.05);
  border-radius: 20px;

  & > * {
    margin-right: 30px;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1.5fr 1fr 1fr;
    grid-template-areas:
      'tech title'
      'desc desc'
      'actions actions';
    height: unset;
    padding: 10px 30px;
    & > * {
      margin: unset;
    }
  }
`;

const StyledTechWrapper = styled.div`
  height: 100%;
  width: 100px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    grid-area: 'tech';
    width: 100%;
    height: 75px;
  }
`;

const StyledLogo = styled.img`
  height: 100%;
`;

const StyledTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    grid-area: title;
    width: 100%;
    height: 75px;
    text-align: right;
  }
`;

const StyledTitle = styled(Heading)`
  font-size: 20px;
  word-wrap: break-word;
`;

const StyledDate = styled(Paragraph)`
  color: gray;
  font-size: 12px;
`;

const StyledDescriptionWrapper = styled.div`
  flex: 2;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    grid-area: desc;
    height: 100%;
    width: 100%;
    padding: 10px 0 10px;
    /* border-top: 1px solid #ddd; */
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
`;

const StyledDescription = styled(Paragraph)`
  color: gray;
`;

const StyledActionsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    grid-area: actions;
    width: 100%;
    padding: 10px 0;
    justify-content: space-around;
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  margin-right: 10px;
  border-radius: 50%;
  transition: transform 0.3s;
  :hover {
    cursor: pointer;
    transform: scale(1.2);
    border: none;
  }
`;

const StyledDivider = styled.div`
  height: 50px;
  width: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    display: none;
  }
`;

const Card = ({ note: { id, title, desc, date } }) => {
  const { deleteNote, setCurrent } = useContext(NotesContext);
  const { setDestination } = useContext(globalContext);

  const onPreview = () => {
    setCurrent(id);
    setDestination(routes.preview);
  };

  const onEdit = () => {
    setCurrent(id);
    setDestination(routes.editor);
  };

  const onDelete = () => {
    deleteNote(id);
  };

  const noteDate = new Date(date).toLocaleDateString();

  return (
    <StyledWrapper>
      <StyledTechWrapper>
        <StyledLogo src={markdownLogo} />
      </StyledTechWrapper>
      <StyledTitleWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>{noteDate}</StyledDate>
      </StyledTitleWrapper>
      <StyledDescriptionWrapper>
        <StyledDescription>{desc}</StyledDescription>
      </StyledDescriptionWrapper>
      <StyledActionsWrapper>
        <StyledButtonIcon icon={openIcon} onClick={onPreview} />
        <StyledButtonIcon icon={editIcon} onClick={onEdit} />
        <StyledDivider />
        <StyledButtonIcon icon={deleteIcon} onClick={onDelete} />
      </StyledActionsWrapper>
    </StyledWrapper>
  );
};

Card.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default Card;
