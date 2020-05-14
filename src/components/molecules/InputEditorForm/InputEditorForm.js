import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Input from '../../atoms/Input/Input';

const StyledLabel = styled(Paragraph)`
  display: block;
  margin-left: 50px;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    margin-left: 20px;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-left: 50px;
  border-radius: 0;
  background-color: white;
  text-align: left;
  border: 1px solid rgb(240, 240, 240);
  padding-left: 10px;
  padding-right: 10px;
  width: calc(400px + 20vw);
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    margin-left: 15px;
    width: 90%;
  }
`;

const InputFieldFinalForm = ({ input, meta, label }) => (
  <div>
    <StyledLabel htmlFor={input.name} as="label">
      {label}:
    </StyledLabel>
    <StyledInput type="text" {...input} id={input.name} />
    {meta.error && <span>{meta.error}</span>}
  </div>
);

InputFieldFinalForm.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default InputFieldFinalForm;
