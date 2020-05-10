import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Form, Field } from 'react-final-form';
import Button from '../../atoms/Button/Button';
import NotesContext from '../../../context/notes/notesContext';
import routes from '../../../routes/routes';
import GlobalContext from '../../../context/global/globalContext';
import InputNewItemForm from '../../molecules/InputNewItemForm/InputNewItemForm';
import TextAreaNewItemForm from '../../molecules/TextAreaFinalForm/TextAreaNewItemForm';

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

  const { addNote } = useContext(NotesContext);
  const { setDestination } = useContext(GlobalContext);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values) => {
    const note = {
      title: values.title,
      desc: values.desc.replace(/(\r\n|\n|\r)/gm, ' '),
      content: '# This is a sample note \n ## Hello',
      date: Date.now(),
    };

    addNote(note);
    panelToggle();
    await sleep(10);
  };

  const redirectToEditor = (isValid) =>
    isValid && setTimeout(() => setDestination(routes.editor), 50);

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
            errors.desc = 'Max lenght of the description is 60 characters';
          }
          return errors;
        }}
        render={({ handleSubmit, form: { resetFieldState, reset }, submitting, valid }) => (
          <StyledForm
            onSubmit={async (event) => {
              await handleSubmit(event);
              valid && resetFieldState('title');
              valid && resetFieldState('desc');
              valid && reset();
            }}
          >
            <StyledFormHeading>Add New File</StyledFormHeading>
            <Field
              name="title"
              render={({ input, meta }) => (
                <InputNewItemForm label="Note title" input={input} meta={meta} />
              )}
            />
            <Field
              name="desc"
              render={({ input, meta }) => (
                <TextAreaNewItemForm label="Description" input={input} meta={meta} />
              )}
            />
            <StyledButtonOpen
              type="submit"
              disabled={submitting || !valid}
              onClick={() => redirectToEditor(valid)}
            >
              Create and open in editor
            </StyledButtonOpen>
            <StyledButtonSave type="submit" disabled={submitting || !valid}>
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
