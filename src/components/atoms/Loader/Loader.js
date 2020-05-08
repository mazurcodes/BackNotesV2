import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spinner from '../../../assets/spinners/Spinner-1s-251px.gif';
import Paragraph from '../Paragraph/Paragraph';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: white;
  background-image: url(${spinner});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 20px;
`;

const Loader = ({ server, error }) => {
  return (
    <StyledLoader>
      {server !== 'down' && <Paragraph>Waking up server</Paragraph>}
      {server === 'down' && <Paragraph>{error}</Paragraph>}
    </StyledLoader>
  );
};

Loader.propTypes = {
  server: PropTypes.string,
  error: PropTypes.string,
};

Loader.defaultProps = {
  server: '',
  error: '',
};

export default Loader;
