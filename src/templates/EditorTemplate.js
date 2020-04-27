import React from 'react';
import UserTemplate from './UserTemplate';
import EditForm from '../components/organisms/EditForm/EditForm';
import ButtonIconPanel from '../components/molecules/ButtonIconPanel/ButtonIconPanel';

// TODO: try move preview field out of Final Form with grid

const EditorTemplate = () => {
  return (
    <UserTemplate>
      <>
        <EditForm />
        <ButtonIconPanel />
      </>
    </UserTemplate>
  );
};

export default EditorTemplate;
