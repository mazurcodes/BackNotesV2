import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';

const StyledWrapper = styled.div`
  background-color: rgb(255, 80, 80);
  padding: 15px 10px;
  margin-bottom: 10px;
  border-radius: 30px;
`;

const StyledAlert = styled(Heading)`
  color: white;
  font-size: 15px;
  word-wrap: break-word;
`;

const Alert = ({ alertObj: { type, msg } }) => {
  return (
    <StyledWrapper>
      <StyledAlert>{alert && `${type}: ${msg}`}</StyledAlert>
    </StyledWrapper>
  );
};

Alert.propTypes = {
  alertObj: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Alert;
