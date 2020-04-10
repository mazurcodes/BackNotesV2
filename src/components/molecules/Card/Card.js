import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import markdownLogo from '../../../assets/logos/markdown-mark.svg';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 75px;
  padding: 10px;
  border: 1px lightgray solid;
`;

const StyledLogo = styled.img`
  height: 70%;
`;

const StyledTitle = styled(Heading)``;

const StyledDescription = styled(Paragraph)``;

const Card = ({ note: { title, desc } }) => {
  return (
    <StyledWrapper>
      <StyledLogo src={markdownLogo} />
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{desc}</StyledDescription>
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

// FIXME: Add icons
