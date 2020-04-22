import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import FilesTemplate from '../templates/FilesTemplate';
import notesContext from '../context/notes/notesContext';
import AuthContext from '../context/auth/authContext';
import Card from '../components/molecules/Card/Card';

const Notes = () => {
  const { notes, getNotes } = useContext(notesContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [destination, setDestination] = useState({ redirect: false, route: null });

  useEffect(() => {
    isAuthenticated && getNotes();
    // eslint-disable-next-line
  }, []);

  const notesList = notes.map((note) => <Card key={note.id} note={note} openIn={setDestination} />);

  if (destination.redirect) return <Redirect push to={destination.route} />;
  return <FilesTemplate>{notesList[0] ? notesList : <p>Nothing to show...</p>}</FilesTemplate>;
};

export default Notes;
