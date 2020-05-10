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

const StyledTextArea = styled(Input)`
  text-align: left;
  padding: 15px 20px;
  background-color: ${({ error }) => error && 'rgba(255, 0, 0, 0.2)'};
  height: 200px;
  border-radius: 30px;
  resize: none;
`;

const StyledError = styled.p`
  text-align: center;
  text-decoration: underline;
  text-decoration-color: red;
`;

const TextAreaNewItemForm = ({ input, meta, label }) => {
  return (
    <StyledFieldWrapper>
      <StyledLabel htmlFor="DescTextArea">{label}:</StyledLabel>
      <StyledTextArea
        as="textarea"
        type="text"
        id="DescTextArea"
        value={input.value}
        onChange={input.onChange}
        placeholder="max. 60"
        error={meta.error && meta.modified}
      />
      {meta.error && meta.modified && <StyledError>{meta.error}</StyledError>}
    </StyledFieldWrapper>
  );
};

TextAreaNewItemForm.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
};

export default TextAreaNewItemForm;
