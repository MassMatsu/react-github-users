import React from 'react';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value='hello'>{children}</GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
