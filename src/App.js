import React from 'react';
import { GithubContext } from './context/context';

const App = () => {
  const { user, requests } = React.useContext(GithubContext);
  console.log(user);
  console.log(requests);
  return <div></div>;
};

export default App;
