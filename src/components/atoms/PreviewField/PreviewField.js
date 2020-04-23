import React, { useContext, useRef, useEffect } from 'react';
import notesContext from '../../../context/notes/notesContext';
import '../../../theme/css/github-markdown.css';

const PreviewField = () => {
  const { renderedContent } = useContext(notesContext);
  const renderedHtml = useRef(null);
  useEffect(() => {
    if (!renderedContent) {
      renderedHtml.current.innerHTML = '<h1>Loading...</h1>  ...or note not selected :(';
    } else {
      renderedHtml.current.innerHTML = renderedContent;
    }
  }, [renderedContent]);
  return <div className="markdown-body" ref={renderedHtml} />;
};

export default PreviewField;
