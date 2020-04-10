import React, { useContext, useEffect } from 'react';
import FilesTemplate from '../templates/FilesTemplate';
import notesContext from '../context/notes/notesContext';
import AuthContext from '../context/auth/authContext';

const Notes = () => {
  const { notes, getNotes } = useContext(notesContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log('hello');
    isAuthenticated && !notes[0] && getNotes();
    // eslint-disable-next-line
  }, []);

  const notesList = notes.map((note) => <p key={note.id}>{note.title}</p>);

  return <FilesTemplate>{notesList[0] ? notesList : <p>Nothing to show...</p>}</FilesTemplate>;
};

export default Notes;
