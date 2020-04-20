import React, { useContext } from 'react';
import notesContext from '../../../context/notes/notesContext';
import '../../../theme/css/github-markdown.css';

const PreviewField = () => {
  const { renderedContent } = useContext(notesContext);
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderedContent }} />;
};

export default PreviewField;
