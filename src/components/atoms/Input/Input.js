import styled from 'styled-components';

const Input = styled.input`
  padding: 15px 40px;
  width: 360px;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.gray};
  text-align: center;
`;

export default Input;
