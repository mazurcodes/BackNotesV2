import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import Heading from '../../atoms/Heading/Heading';
import Button from '../../atoms/Button/Button';
import GlobalContext from '../../../context/global/globalContext';
import AuthContext from '../../../context/auth/authContext';
import routes from '../../../routes/routes';
import InputAuthForm from '../../molecules/InputAuthForm/InputAuthForm';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 460px;
  background-color: white;
  border-radius: 20px;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 400px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    width: 310px;
  }
`;

const StyledFormHeading = styled(Heading)`
  margin: 35px 0;
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    margin: 20px 0;
    font-size: 20px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-bottom: 40px;
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    width: 90%;
    margin-bottom: 30px;
  }
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

  const { register, login, authError } = useContext(AuthContext);

  const onSubmit = (values) => {
    currentPage === '/login' ? login(values) : register(values);
  };

  return (
    <StyledWrapper>
      <StyledFormHeading>{formType}</StyledFormHeading>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          // email
          if (currentPage === '/register' && !values.name) {
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
          if (currentPage === '/register' && values.password !== values.password2) {
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
                  <InputAuthForm type="text" placeholder="Name" input={input} meta={meta} />
                )
              }
            />
            <Field
              name="email"
              render={({ input, meta }) => (
                <InputAuthForm
                  type="email"
                  placeholder="Email"
                  input={input}
                  meta={meta}
                  authError={authError}
                />
              )}
            />
            <Field
              name="password"
              render={({ input, meta }) => (
                <InputAuthForm
                  type="password"
                  placeholder="Password"
                  input={input}
                  meta={meta}
                  authError={authError}
                />
              )}
            />
            <Field
              name="password2"
              render={({ input, meta }) =>
                currentPage === '/register' && (
                  <InputAuthForm
                    type="password"
                    placeholder="Confirm password"
                    input={input}
                    meta={meta}
                  />
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
