import React, { useContext, useEffect } from 'react';
import FilesTemplate from '../templates/FilesTemplate';
import NotesContext from '../context/notes/notesContext';
import AuthContext from '../context/auth/authContext';
import Card from '../components/molecules/Card/Card';

const Notes = () => {
  const { notes, getNotes, clearCurrent } = useContext(NotesContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && getNotes();
    clearCurrent();
    return () => {
      window.history.forward();
    };
    // eslint-disable-next-line
  }, []);

  const notesList = notes.map((note) => <Card key={note.id} note={note} />);

  return <FilesTemplate>{notesList[0] ? notesList : <p>Nothing to show...</p>}</FilesTemplate>;
};

export default Notes;
