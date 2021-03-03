import React from 'react';
import { GithubContext } from './context/context';

const App = () => {
  const data = React.useContext(GithubContext);
  return <div>{data}</div>;
};

export default App;
