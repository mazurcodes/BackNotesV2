import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';

const StyledFieldWrapper = styled.div`
  margin-bottom: 40px;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 5px 20px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledInput = styled(Input)`
  text-align: left;
  padding: 15px 20px;
  background-color: ${({ error }) => error && 'rgba(255, 0, 0, 0.2)'};
`;

const StyledError = styled.p`
  text-align: center;
  text-decoration: underline;
  text-decoration-color: red;
`;

const InputNewItemForm = ({ input, meta, label }) => {
  return (
    <StyledFieldWrapper>
      <StyledLabel htmlFor="titleInput">{label}:</StyledLabel>
      <StyledInput
        type="text"
        id="titleInput"
        value={input.value}
        onChange={input.onChange}
        placeholder="max. 24"
        error={meta.error && meta.modified}
      />

      {meta.error && meta.modified && <StyledError>{meta.error}</StyledError>}
    </StyledFieldWrapper>
  );
};

InputNewItemForm.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default InputNewItemForm;
