import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GlobalState from '../context/global/GlobalState';
import MainTemplate from '../templates/MainTemplate';
import routes from '../routes/routes';
import Login from './Login';
import Register from './Register';
import AuthState from '../context/auth/AuthState';
import PrivateRoute from '../components/utils/PrivateRoute';
import Notes from './Notes';
import Preview from './Preview';
import Editor from './Editor';

const Root = () => {
  return (
    <GlobalState>
      <AuthState>
        <BrowserRouter>
          <MainTemplate>
            <Switch>
              <Route exact path={routes.home} render={() => <Redirect to={routes.notes} />} />
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.register} component={Register} />
              <PrivateRoute exact path={routes.notes} component={Notes} />
              <Route exact path={routes.preview} component={Preview} />
              <Route exact path={routes.editor} component={Editor} />
            </Switch>
          </MainTemplate>
        </BrowserRouter>
      </AuthState>
    </GlobalState>
  );
};

export default Root;
