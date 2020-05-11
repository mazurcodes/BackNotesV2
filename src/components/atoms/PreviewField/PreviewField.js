import React, { useContext, useRef, useEffect } from 'react';
import NotesContext from '../../../context/notes/notesContext';
import '../../../theme/css/github-markdown.css';

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
  return <div className="markdown-body" ref={renderedHtml} />;
};

export default PreviewField;
