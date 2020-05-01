import React, { useContext } from 'react';
import GlobalContext from '../../../context/global/globalContext';
import routes from '../../../routes/routes';
import StatusBarNotes from './StatusBarNotes';
import StatusBarPreview from './StatusBarPreview';
import StatusBarEditor from './StatusBarEditor';

// TODO: use React.memo
const StatusBar = () => {
  const { currentPage } = useContext(GlobalContext);

  if (currentPage === routes.preview) return <StatusBarPreview />;
  if (currentPage === routes.editor) return <StatusBarEditor />;

  return <StatusBarNotes />;
};

export default StatusBar;
