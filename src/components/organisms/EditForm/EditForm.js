import React from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import TextArea from '../../atoms/TextArea/TextArea';

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const StyledLabel = styled(Paragraph)`
  display: block;
  margin-left: 50px;
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
`;

const StyledInputDesc = styled(StyledInput)`
  width: calc(400px + 20vw);
`;

const StyledEditPreviewField = styled.div`
  flex: 1;
  display: flex;
`;

const StyledEditField = styled(TextArea)`
  /* min-height: 100%; */
  flex: 1;
`;

const StyledPreviewField = styled.div`
  flex: 1;
  padding: 20px 50px;
`;

const EditSpacer = styled.div`
  width: 20px;
  background-color: lightsalmon;
`;

const EditForm = () => {
  const onSubmit = (values) => console.log(values);

  // TODO: Validate form

  // const validate = (values) => {
  //   const errors = {};
  //   console.log('validate:', values);
  //   return errors;
  // };

  const onChange = (change) => console.log(change);

  return (
    <Form
      className="Form"
      onSubmit={onSubmit}
      initialValues={{
        title: 'hello from initial values',
        description: 'this is new description from somewhere',
      }}
      // TODO: Validate function
      // validate={validate}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FormSpy
            onChange={onChange}
            subscription={{ values: true, errors: true, modified: true }}
          />
          <Field name="title">
            {({ input, meta }) => (
              <div>
                <StyledLabel htmlFor="title" as="label">
                  Title:
                </StyledLabel>
                <StyledInput type="text" {...input} id="title" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="description">
            {({ input, meta }) => (
              <div>
                <StyledLabel htmlFor="desc" as="label">
                  Description:
                </StyledLabel>
                <StyledInputDesc type="text" {...input} id="desc" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <StyledEditPreviewField>
            <StyledEditField />
            <EditSpacer />
            <StyledPreviewField>
              dfdfdhgfh fghgfh fghgfhfgh fgh fghgfhfgh fghgfhfgh
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
              <div>fgfgfdgfgfdgfd</div>
            </StyledPreviewField>
          </StyledEditPreviewField>
        </StyledForm>
      )}
    />
  );
};

export default EditForm;
