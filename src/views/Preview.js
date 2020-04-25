import React from 'react';
import styled from 'styled-components';
import UserTemplate from '../templates/UserTemplate';
import PreviewField from '../components/atoms/PreviewField/PreviewField';

const StyledPreviewWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Preview = () => {
  return (
    <UserTemplate>
      <StyledPreviewWrapper>
        <PreviewField />
      </StyledPreviewWrapper>
    </UserTemplate>
  );
};

export default Preview;
