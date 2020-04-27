import React, { useContext } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import styled from 'styled-components';
import notesContext from '../../../context/notes/notesContext';
import Spacer from '../../atoms/Spacer/Spacer';
import InputFieldFinalForm from '../../molecules/InputFinalForm/InputFinalForm';
import EditorField from '../EditorField/EditorField';

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const EditForm = () => {
  const { initialCurrentValues, updateCurrent } = useContext(notesContext);

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

  const onChange = (change) => {
    const { modified, values, errors } = change;

    const noteFields = { ...values };

    // content can be empty but then it will get into trouble with
    // rendering empty markdown in updateCurrent action.
    if (modified.content) noteFields.content = values.content || '\n';

    const isError = Object.keys(errors).length < 1;
    const isModified = Object.values(modified).some((value) => value);
    isError && isModified && updateCurrent(noteFields);
  };

  return (
    <Form
      className="Form"
      onSubmit={onSubmit}
      initialValues={initialCurrentValues}
      validate={validate}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FormSpy
            onChange={onChange}
            subscription={{ values: true, errors: true, modified: true }}
          />
          <Field
            name="title"
            render={(props) => <InputFieldFinalForm label="Title" {...props} />}
          />
          <Field
            name="desc"
            render={(props) => <InputFieldFinalForm label="Description" {...props} />}
          />
          <Spacer height="5px" width="100%" color="#ddd" />
          <Field name="content" component={EditorField} />
        </StyledForm>
      )}
    />
  );
};

export default EditForm;
