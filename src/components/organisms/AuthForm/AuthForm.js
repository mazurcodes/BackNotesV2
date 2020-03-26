import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import Heading from '../../atoms/Heading/Heading';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import GlobalContext from '../../../context/global/globalContext';
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

  const onSubmit = (values) => console.log(values);

  return (
    <StyledWrapper>
      <StyledFormHeading>{formType}</StyledFormHeading>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field
              name="email"
              render={({ input }) => (
                <StyledInput
                  type="email"
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder="Email"
                />
              )}
            />
            <Field
              name="password"
              render={({ input }) => (
                <StyledInput
                  type="password"
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder="Password"
                />
              )}
            />
            <Field
              name="password2"
              render={({ input }) =>
                currentPage === '/register' && (
                  <StyledInput
                    type="password"
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="Confirm password"
                  />
                )
              }
            />
            <StyledButton type="submit">{formType}</StyledButton>
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

/* <StyledWrapper>
      <StyledFormHeading>{formType}</StyledFormHeading>
      <StyledForm>
        <StyledInput type="email" placeholder="Email" />
        <StyledInput type="password" placeholder="Password" />
        {currentPage === routes.register}
        <StyledButton>{formType}</StyledButton>
        <StyledRedirectLink onClick={onRedirect}>
          I want to {currentPage === routes.login ? 'register' : 'login'}
        </StyledRedirectLink>
      </StyledForm>
    </StyledWrapper> */
