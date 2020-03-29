import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Form, Field } from 'react-final-form';
import Heading from '../../atoms/Heading/Heading';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import GlobalContext from '../../../context/global/globalContext';
import AuthContext from '../../../context/auth/authContext';
import routes from '../../../routes/routes';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 460px;
  background-color: white;
  border-radius: 10px;
`;

const StyledFormHeading = styled(Heading)`
  margin: 35px 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;

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

const StyledButton = styled(Button)`
  margin-bottom: 40px;
`;

const StyledRedirectLink = styled.a`
  text-decoration: underline;
  margin-bottom: 40px;
  :hover {
    cursor: pointer;
  }
`;

const AuthForm = ({ onRedirect }) => {
  const { currentPage } = useContext(GlobalContext);
  const formType = currentPage === '/login' ? 'Login' : 'Register';

  const { register } = useContext(AuthContext);

  // TODO: Auth state with register and login methods
  const onSubmit = (values) => register(values);

  return (
    <StyledWrapper>
      <StyledFormHeading>{formType}</StyledFormHeading>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          // email
          if (!values.name) {
            errors.name = 'Name is required';
          }
          if (!values.email) {
            errors.email = 'Email is required';
          }
          const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email);
          if (!isEmailValid) {
            errors.email = 'Provide valid email address';
          }

          // password
          if (!values.password) {
            errors.password = 'Password is required';
          }
          const isPasswordValid = /^(?=.{6,})/.test(values.password);
          if (!isPasswordValid) {
            errors.password = 'Password must be at least 6 chracters';
          }

          // password2
          if (values.password !== values.password2) {
            errors.password2 = `Passwords don't match`;
          }
          return errors;
        }}
        render={({ handleSubmit, submitting }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field
              name="name"
              render={({ input, meta }) =>
                currentPage === '/register' && (
                  <>
                    <StyledInput
                      type="text"
                      name={input.name}
                      value={input.value}
                      onChange={input.onChange}
                      placeholder="Name"
                      error={meta.error && meta.touched}
                    />
                    {meta.error && meta.touched && <StyledError>{meta.error}</StyledError>}
                  </>
                )
              }
            />
            <Field
              name="email"
              render={({ input, meta }) => (
                <>
                  <StyledInput
                    type="email"
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="Email"
                    error={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <StyledError>{meta.error}</StyledError>}
                </>
              )}
            />
            <Field
              name="password"
              render={({ input, meta }) => (
                <>
                  <StyledInput
                    type="password"
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="Password"
                    error={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <StyledError>{meta.error}</StyledError>}
                </>
              )}
            />
            <Field
              name="password2"
              render={({ input, meta }) =>
                currentPage === '/register' && (
                  <>
                    <StyledInput
                      type="password"
                      name={input.name}
                      value={input.value}
                      onChange={input.onChange}
                      placeholder="Confirm password"
                      error={meta.error && meta.touched}
                    />
                    {meta.error && <StyledError>{meta.error}</StyledError>}
                  </>
                )
              }
            />
            <StyledButton type="submit" disabled={submitting}>
              {formType}
            </StyledButton>
          </StyledForm>
        )}
      />
      <StyledRedirectLink onClick={onRedirect}>
        I want to {currentPage === routes.login ? 'register' : 'login'}
      </StyledRedirectLink>
    </StyledWrapper>
  );
};

AuthForm.propTypes = {
  onRedirect: PropTypes.func.isRequired,
};

export default AuthForm;
