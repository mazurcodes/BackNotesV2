import React from 'react';
import styled from 'styled-components';
import UserTemplate from './UserTemplate';
import PreviewField from '../components/atoms/PreviewField/PreviewField';
import ButtonIconPanel from '../components/molecules/ButtonIconPanel/ButtonIconPanel';

const StyledPreviewWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const PreviewTemplate = () => {
  return (
    <UserTemplate>
      <>
        <StyledPreviewWrapper>
          <PreviewField />
        </StyledPreviewWrapper>
        <ButtonIconPanel />
      </>
    </UserTemplate>
  );
};

export default PreviewTemplate;
