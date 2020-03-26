import styled from 'styled-components';

const Button = styled.button`
  padding: 15px 40px;
  width: 360px;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.notes};
  text-align: center;
  color: white;
`;

export default Button;
