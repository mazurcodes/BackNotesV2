import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  background-color: transparent;
  background-image: url(${({ icon }) => icon});
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 7px;
  :hover {
    cursor: pointer;
  }
`;

export default ButtonIcon;
