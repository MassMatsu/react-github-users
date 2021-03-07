import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children, ...rest }) => {
  // props - children for Dashboard wrapped with this PrivateRoute

  const { isAuthenticated, user } = useAuth0(); // utilise auth info through useAuth0()
  const isUser = isAuthenticated && user;

  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to='/login'></Redirect>;
      }}
    ></Route>
  );
};

export default PrivateRoute;
