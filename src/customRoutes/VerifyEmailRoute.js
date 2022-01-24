import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUserProvider';

const VerifyEmailRoute = ({ children }) => {
  const user = useCurrentUser();
  const isLoggedIn = user;
  const isVerified = user ? user.emailVerified : false;

  if (isLoggedIn) {
    if (!isVerified) {
      return children;
    }

    return <Navigate to="/" />;
  }

  return <Navigate to="/register" />;
};

export default VerifyEmailRoute;
