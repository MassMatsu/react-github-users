import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const GithubContext = React.createContext();
const rootUrl = 'https://api.github.com';
const rateLimitUrl = 'https://api.github.com/rate_limit';

const GithubProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });
  const [user, setUser] = useState('john-smilga');
  const [followers, setFollowers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [requests, setRequests] = useState(0);

  const fetchUser = async () => {
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );
    console.log(response.data);
    if (response.data) {
      setUser(response.data);
    } else {
      console.log('error');
    }
  };

  const fetchRate = async () => {
    const response = await axios(rateLimitUrl);
    setRequests(response.data.rate.remaining);
  };
  useEffect(() => {
    fetchRate();
    fetchUser();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        loading,
        error,
        user,
        followers,
        repos,
        requests,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
