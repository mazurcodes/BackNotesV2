import React from 'react';
import UserTemplate from './UserTemplate';
import EditForm from '../components/organisms/EditForm/EditForm';
import ButtonIconPanel from '../components/molecules/ButtonIconPanel/ButtonIconPanel';

const EditorTemplate = () => {
  return (
    <UserTemplate>
      <>
        <EditForm />
        <ButtonIconPanel editor />
      </>
    </UserTemplate>
  );
};

export default EditorTemplate;
