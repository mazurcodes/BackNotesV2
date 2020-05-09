import React, { useContext } from 'react';
import styled from 'styled-components';
import AlertContext from '../../../context/alert/alertContext';
import Alert from '../Alert/Alert';

const StyledPanel = styled.div`
  position: fixed;
  left: 100px;
  bottom: 50px;
  max-height: 80vh;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const AlertPanel = () => {
  const { alerts } = useContext(AlertContext);
  const alertList = alerts.map((alertObj) => <Alert key={alertObj.id} alertObj={alertObj} />);

  return <StyledPanel>{alertList}</StyledPanel>;
};

export default AlertPanel;
