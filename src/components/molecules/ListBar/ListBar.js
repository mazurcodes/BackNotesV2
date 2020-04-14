import React from 'react';
import styled from 'styled-components';

const StyledListWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
  height: 20px;
  font-size: 10px;
  box-shadow: 3px 3px 7px 2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  & > * {
    margin-right: 30px;
  }
`;

const StyledTechWrapper = styled.div`
  width: 100px;
  text-align: center;
`;
const StyledTitleWrapper = styled.div`
  width: 250px;
`;
const StyledDescWrapper = styled.div`
  flex: 1;
`;
const StyledActionsWrapper = styled.div`
  width: 250px;
  /* text-align: center; */
`;

const ListBar = () => {
  return (
    <StyledListWrapper>
      <StyledTechWrapper>
        <p>Technology</p>
      </StyledTechWrapper>
      <StyledTitleWrapper>
        <p>Title</p>
      </StyledTitleWrapper>
      <StyledDescWrapper>
        <p>Description</p>
      </StyledDescWrapper>
      <StyledActionsWrapper>
        <p>Actions</p>
      </StyledActionsWrapper>
    </StyledListWrapper>
  );
};

export default ListBar;
