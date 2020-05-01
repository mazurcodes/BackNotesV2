import React, { useContext, useRef, useEffect } from 'react';
import notesContext from '../../../context/notes/notesContext';
import '../../../theme/css/github-markdown.css';

const PreviewField = () => {
  const { renderedContent, updateHTMLStats } = useContext(notesContext);
  const renderedHtml = useRef(null);

  useEffect(() => {
    if (!renderedContent) {
      renderedHtml.current.innerHTML = '<h1>Loading...</h1>  ...or note not selected :(';
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
