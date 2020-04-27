import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../../context/global/globalContext';
import routes from '../../routes/routes';

const RedirectRoute = () => {
  const { redirectTo } = useContext(GlobalContext);

  if (redirectTo === routes.editor) return <Redirect push to={redirectTo} />;
  if (redirectTo === routes.preview) return <Redirect push to={redirectTo} />;
  if (redirectTo === routes.notes) return <Redirect push to={redirectTo} />;
  return <div />;
};

export default RedirectRoute;
