import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Dashboard,
  Error,
  Login,
  PrivateRoute,
  AuthWrapper,
} from './pages/index';

const App = () => {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute exact path='/'>
            <Dashboard />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route>
            <Error path='*' />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
};

export default App;
