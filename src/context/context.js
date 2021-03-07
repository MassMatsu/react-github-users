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

  const fetchUser = async (searchText) => {
    setLoading(true);
    toggleError();
    const response = await axios(
      `${rootUrl}/users/${searchText}`
    ).catch((error) => console.log(error));

    if (response) {
      setUser(response.data);
      const { followers_url, repos_url } = response.data;

      // axios(`${followers_url}?per_page=100`)
      //   .then((response) => setFollowers(response.data))
      //   .catch((error) => console.log(error));
      // axios(`${repos_url}?per_page=100`)
      //   .then((response) => setRepos(response.data))
      //   .catch((error) => console.log(error));

      await Promise.allSettled([
        axios(`${followers_url}?per_page=100`),
        axios(`${repos_url}?per_page=100`),
      ])
        .then((response) => {
          const [followers, repos] = response;
          const status = 'fulfilled';
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log('error');
      toggleError(true, 'there is no matching user for your search');
    }

    setLoading(false);
    checkRequests();
  };

  const checkRequests = async () => {
    const response = await axios(rateLimitUrl);
    setRequests(response.data.rate.remaining);
    if (response.data.rate.remaining === 0) {
      toggleError(true, 'sorry, you have exceeded hourly rate limit');
    }
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  useEffect(() => {
    fetchUser(user);
    // eslint-disable-next-line
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
        fetchUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
