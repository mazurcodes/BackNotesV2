import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserTemplate from '../templates/UserTemplate';
import notesContext from '../context/notes/notesContext';
import routes from '../routes/routes';
import PreviewField from '../components/atoms/PreviewField/PreviewField';

const Preview = () => {
  const { current } = useContext(notesContext);

  if (!current) return <Redirect to={routes.notes} />;
  return (
    <UserTemplate>
      <PreviewField />
    </UserTemplate>
  );
};

export default Preview;
