import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import markdownLogo from '../../../assets/logos/react.png';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import openIcon from '../../../assets/icons/icon-open.svg';
import editIcon from '../../../assets/icons/icon-edit.svg';
import deleteIcon from '../../../assets/icons/icon-delete.svg';

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
`;

const StyledTechWrapper = styled.div`
  height: 100%;
  width: 100px;
  text-align: center;
`;

const StyledLogo = styled.img`
  height: 100%;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 100%;
`;

const StyledTitle = styled(Heading)`
  font-size: 20px;
`;

const StyledDate = styled(Paragraph)`
  color: gray;
  font-size: 12px;
`;

const StyledDescriptionWrapper = styled.div`
  flex: 1;
`;

const StyledDescription = styled(Paragraph)`
  color: gray;
`;

const StyledActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 100%;
`;

const StyledButtonIcon = styled(ButtonIcon)`
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
`;

const Card = ({ note: { title, desc } }) => {
  return (
    <StyledWrapper>
      <StyledTechWrapper>
        <StyledLogo src={markdownLogo} />
      </StyledTechWrapper>
      <StyledTitleWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>04.04.2020</StyledDate>
      </StyledTitleWrapper>
      <StyledDescriptionWrapper>
        <StyledDescription>{desc}</StyledDescription>
      </StyledDescriptionWrapper>
      <StyledActionsWrapper>
        <StyledButtonIcon icon={openIcon} />
        <StyledButtonIcon icon={editIcon} />
        <StyledDivider />
        <StyledButtonIcon icon={deleteIcon} />
      </StyledActionsWrapper>
    </StyledWrapper>
  );
};

Card.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
};

export default Card;
