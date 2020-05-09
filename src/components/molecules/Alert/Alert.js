import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../../atoms/Heading/Heading';

const StyledWrapper = styled.div`
  background-color: rgb(255, 80, 80);
  padding: 10px 5px;
  margin-bottom: 10px;
`;

const StyledAlert = styled(Heading)`
  color: white;
  font-size: 15px;
  word-wrap: break-word;
`;

const Alert = ({ alertMsg }) => {
  return (
    <StyledWrapper>
      <StyledAlert>{alertMsg}</StyledAlert>
    </StyledWrapper>
  );
};

Alert.propTypes = {
  alertMsg: PropTypes.string.isRequired,
};

export default Alert;
