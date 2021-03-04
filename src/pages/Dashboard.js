import React from 'react';
import { GithubContext } from '../context/context';
import { Info, Repos, User, Search, Navbar } from '../components/index';

const Dashboard = () => {
  const { user, requests } = React.useContext(GithubContext);
  console.log(user);
  console.log(requests);
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
