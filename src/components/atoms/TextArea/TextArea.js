import styled from 'styled-components';

const TextArea = styled.textarea`
  border: none;
  background-color: rgb(250, 250, 250);
  padding: 20px 20px 20px 50px;
  resize: none;
  word-wrap: break-word;
  word-break: break-all;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    padding: 15px 15px 15px 30px;
  }
`;

export default TextArea;
