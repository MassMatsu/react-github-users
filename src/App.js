import React from 'react';
import { GithubContext } from './context/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard, Error, Login } from './pages/index';

const App = () => {
  const { user, requests } = React.useContext(GithubContext);
  console.log(user);
  console.log(requests);
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route>
          <Error path='*' />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
