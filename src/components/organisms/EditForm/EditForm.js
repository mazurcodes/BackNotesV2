import React, { useContext } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import styled from 'styled-components';
import NotesContext from '../../../context/notes/notesContext';
import Spacer from '../../atoms/Spacer/Spacer';
import InputEditorForm from '../../molecules/InputEditorForm/InputEditorForm';
import EditorField from '../EditorField/EditorField';

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const EditForm = () => {
  const { initialCurrentValues, updateCurrent } = useContext(NotesContext);

  const onSubmit = () => {};

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = ' Title is required';
    }
    if (values.title && values.title.length > 24) {
      errors.title = ' Max lenght of the title is 24 characters';
    }

    if (!values.desc) {
      errors.desc = ' Description is required';
    }
    if (values.desc && values.desc.length > 60) {
      errors.desc = ' Max lenght of the description is 24 characters';
    }
    return errors;
  };

  const onChange = ({ values, modified, errors, active }) => {
    const noteFields = { ...values };
    // content can be empty but then it will get into trouble with
    // updating current state. It's better to send smthg like \n
    if (modified.content) noteFields.content = values.content || '\n';

    const isError = Object.keys(errors).length < 1;

    // const isModified = Object.values(modified).some((value) => value);
    // isError && isModified && updateCurrent(noteFields);

    // modified property is broken. Send ticket.
    // When value of a field is changed programatically
    // it doesn't trigger 'modified' property to true.
    isError && active && updateCurrent(noteFields);
  };

  return (
    <Form
      className="Form"
      onSubmit={onSubmit}
      initialValues={initialCurrentValues}
      validate={validate}
      mutators={{
        setValue: ([field, value], state, utils) => {
          utils.changeValue(state, field, () => value);
        },
      }}
      render={({ handleSubmit, form }) => {
        return (
          <StyledForm onSubmit={handleSubmit}>
            <FormSpy
              onChange={onChange}
              subscription={{ values: true, errors: true, modified: true, active: true }}
            />
            <Field
              name="title"
              render={({ input, meta }) => (
                <InputEditorForm label="Title" input={input} meta={meta} />
              )}
            />
            <Field
              name="desc"
              render={({ input, meta }) => (
                <InputEditorForm label="Description" input={input} meta={meta} />
              )}
            />
            <Spacer height="5px" width="100%" color="#ddd" />
            <Field
              name="content"
              component={EditorField}
              contentValueMutator={form.mutators.setValue}
            />
          </StyledForm>
        );
      }}
    />
  );
};

export default EditForm;
