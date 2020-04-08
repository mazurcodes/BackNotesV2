import React, { useContext, useEffect } from 'react';
import FilesTemplate from '../templates/FilesTemplate';
import notesContext from '../context/notes/notesContext';

const Notes = () => {
  const { notes, getNotes } = useContext(notesContext);

  useEffect(() => {
    !notes[0] && getNotes();
    // eslint-disable-next-line
  }, []);

  const notesList = notes.map((note) => <p>{note.title}</p>);

  return <FilesTemplate>{notesList[0] ? notesList : <p>Nothing to show...</p>}</FilesTemplate>;
};

export default Notes;
