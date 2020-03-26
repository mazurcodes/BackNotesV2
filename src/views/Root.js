import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GlobalState from '../context/global/GlobalState';
import MainTemplate from '../templates/MainTemplate';
import routes from '../routes/routes';
// import PrivateRoute from '../routes/PrivateRoute';
import Login from './Login';
import Register from './Register';

const Root = () => {
  return (
    <GlobalState>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} render={() => <Redirect to={routes.login} />} />
            <Route exact path={routes.login} component={Login} />
            <Route exact path={routes.register} component={Register} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </GlobalState>
  );
};

export default Root;
