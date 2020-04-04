import React, { useContext } from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import GlobalContext from '../../../context/global/globalContext';
import TitleBar from '../TitleBar/TitleBar';
import routes from '../../../routes/routes';

const StyledWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffc01f;
  height: 50px;
  padding: 0 50px;
`;

const StyledTitleField = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledTitle = styled(Paragraph)`
  margin-right: 10px;
`;

const StyledDataContent = styled(Paragraph)`
  color: white;
`;

const StyledInput = styled(Input)`
  display: block;
  font-size: 16px;
  height: 35px;
  width: calc(50px + 25vw);
  max-width: 375px;
`;

const EditBar = () => {
  const { currentPage } = useContext(GlobalContext);

  if (currentPage === routes.notes) return <TitleBar />;
  return (
    <StyledWrapper>
      <StyledTitleField>
        <StyledTitle>Current file:</StyledTitle>
        <StyledDataContent>React </StyledDataContent>
      </StyledTitleField>
      <StyledInput placeholder="Search" />
    </StyledWrapper>
  );
};

export default EditBar;
