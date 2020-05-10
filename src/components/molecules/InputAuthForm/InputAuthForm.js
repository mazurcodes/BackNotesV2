import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Input from '../../atoms/Input/Input';

const StyledInput = styled(Input)`
  margin-bottom: 20px;
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    width: 90%;
    margin-bottom: 10px;
  }

  ${({ error }) =>
    error &&
    css`
      background-color: ${({ theme }) => theme.errorInput};
    `}
`;

const StyledError = styled.div`
  margin-bottom: 20px;
  color: red;
  font-weight: ${({ theme }) => theme.bold};
`;

const InputAuthForm = ({ type, placeholder, input, meta, authError }) => {
  return (
    <>
      <StyledInput
        type={type}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        placeholder={placeholder}
        error={meta.error && meta.touched}
      />
      {meta.error && meta.touched && <StyledError>{meta.error}</StyledError>}
      {authError && authError.msg.includes(type) && <StyledError>{authError.msg}</StyledError>}
    </>
  );
};

InputAuthForm.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authError: PropTypes.oneOfType([PropTypes.object]),
};

InputAuthForm.defaultProps = {
  authError: null,
};

export default InputAuthForm;
