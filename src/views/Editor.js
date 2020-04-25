import React from 'react';
import UserTemplate from '../templates/UserTemplate';
import EditForm from '../components/organisms/EditForm/EditForm';

// TODO: try move preview field out of editForm and Final Form

const Editor = () => {
  return (
    <UserTemplate>
      <EditForm />
    </UserTemplate>
  );
};

export default Editor;
