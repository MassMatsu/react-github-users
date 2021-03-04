import React from 'react';
import { GithubContext } from '../context/context';

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  console.log(repos);
  return <div>Repos</div>;
};

export default Repos;
