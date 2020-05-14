import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import NotesContext from '../../../context/notes/notesContext';
import '../../../theme/css/github-markdown.css';

const StyledPreviewWrapper = styled.div`
  padding: 50px 60px;
  flex: 1;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    padding: 30px 20px;
  }
`;

const StyledPreview = styled.div`
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 14px;
  }
`;

const PreviewField = () => {
  const { renderedContent, updateHTMLStats } = useContext(NotesContext);
  const renderedHtml = useRef(null);

  useEffect(() => {
    if (!renderedContent) {
      renderedHtml.current.innerHTML = 'Loading...';
      updateHTMLStats(renderedHtml.current);
    } else {
      renderedHtml.current.innerHTML = renderedContent;
      updateHTMLStats(renderedHtml.current);
    }
    // eslint-disable-next-line
  }, [renderedContent]);
  return (
    <StyledPreviewWrapper>
      <StyledPreview className="markdown-body" ref={renderedHtml} />
    </StyledPreviewWrapper>
  );
};

export default PreviewField;
