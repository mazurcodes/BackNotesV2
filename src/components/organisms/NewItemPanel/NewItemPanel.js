import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import notesContext from '../../../context/notes/notesContext';
import routes from '../../../routes/routes';

const StyledWrapper = styled.div`
  width: 600px;
  height: 100%;
  position: fixed;
  /* right: 0px; */
  right: -600px;
  top: 0;
  background-color: white;
  transition: transform 0.3s;
  box-shadow: -3px 0 10px 4px rgba(0, 0, 0, 0.05);

  ${({ active }) =>
    active &&
    css`
      transform: translateX(-600px);
    `}
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFormHeading = styled.h2`
  font-size: 50px;
  font-weight: ${({ theme }) => theme.regular};
  margin: 40px 0;
`;

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

const StyledTextArea = styled(StyledInput)`
  height: 200px;
  border-radius: 30px;
  resize: none;
`;

const StyledButtonOpen = styled(Button)`
  background-color: #5fd417;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledButtonSave = styled(Button)`
  background-color: #19c3e9;
  font-weight: ${({ theme }) => theme.bold};
`;

const NewItemPanel = (props) => {
  const { isActive, panelToggle } = props;

  const [redirect, setRedirect] = useState(false);

  const { addNote } = useContext(notesContext);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values) => {
    const note = {
      title: values.title,
      desc: values.desc.replace(/(\r\n|\n|\r)/gm, ' '),
      content: '# Write your notes here :) \n ## Hellow',
    };

    addNote(note);
    panelToggle();
    await sleep(100);
  };

  const openEditor = () => setTimeout(() => setRedirect(true), 10);

  if (redirect) return <Redirect push to={routes.editor} />;

  return (
    <StyledWrapper active={isActive}>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = 'Title is required';
          }
          if (values.title && values.title.length > 24) {
            errors.title = 'Max lenght of the title is 24 characters';
          }

          if (!values.desc) {
            errors.desc = 'Description is required';
          }
          if (values.desc && values.desc.length > 60) {
            errors.desc = 'Max lenght of the description is 24 characters';
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, valid }) => (
          <StyledForm
            onSubmit={async (event) => {
              await handleSubmit(event);
              valid && form.reset();
            }}
          >
            <StyledFormHeading>Add New File</StyledFormHeading>
            <Field
              name="title"
              render={({ input, meta }) => (
                <StyledFieldWrapper>
                  <StyledLabel htmlFor="titleInput">Note title:</StyledLabel>
                  <StyledInput
                    type="text"
                    id="titleInput"
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="max. 24"
                    maxLength="25"
                    error={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <StyledError>{meta.error}</StyledError>}
                </StyledFieldWrapper>
              )}
            />
            <Field
              name="desc"
              render={({ input, meta }) => (
                <StyledFieldWrapper>
                  <StyledLabel htmlFor="DescTextArea">Description:</StyledLabel>
                  <StyledTextArea
                    as="textarea"
                    type="text"
                    id="DescTextArea"
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="max. 60"
                    maxLength="60"
                    error={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <StyledError>{meta.error}</StyledError>}
                </StyledFieldWrapper>
              )}
            />
            <StyledButtonOpen type="submit" disabled={submitting || pristine} onClick={openEditor}>
              Create and open in editor
            </StyledButtonOpen>
            <StyledButtonSave type="submit" disabled={submitting || pristine}>
              Just save, edit later
            </StyledButtonSave>
          </StyledForm>
        )}
      />
    </StyledWrapper>
  );
};

NewItemPanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  panelToggle: PropTypes.func.isRequired,
};

export default NewItemPanel;
