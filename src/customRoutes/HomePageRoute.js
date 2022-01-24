import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUserProvider';

const HomePageRoute = ({ children }) => {
  const user = useCurrentUser();
  const isLoggedIn = user;
  const isVerified = user ? user.emailVerified : false;
  const hasUsername = user ? user.username : false;

  if (isLoggedIn) {
    if (isVerified) {
      if (hasUsername) {
        return children;
      }

      return <Navigate to="/createProfile" />;
    }

    return <Navigate to="/verifyEmail" />;
  }

  return <Navigate to="/register" />;
};

export default HomePageRoute;
