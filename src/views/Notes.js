import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import FilesTemplate from '../templates/FilesTemplate';
import notesContext from '../context/notes/notesContext';
import AuthContext from '../context/auth/authContext';
import Card from '../components/molecules/Card/Card';
import routes from '../routes/routes';

const Notes = () => {
  const { notes, getNotes, current } = useContext(notesContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && getNotes();
    // eslint-disable-next-line
  }, []);

  const notesList = notes.map((note) => <Card key={note.id} note={note} />);

  if (current) return <Redirect push to={routes.preview} />;
  return <FilesTemplate>{notesList[0] ? notesList : <p>Nothing to show...</p>}</FilesTemplate>;
};

export default Notes;
