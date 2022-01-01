import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUserProvider';

const CreateProfileRoute = ({ children }) => {
  const user = useCurrentUser();
  const isLoggedIn = user;
  const isVerified = user ? user.emailVerified : false;
  const hasUsername = false;

  if (isLoggedIn) {
    if (isVerified) {
      if (!hasUsername) {
        return children;
      }
    }

    return <Navigate to="/" />;
  }

  return <Navigate to="/signin" />;
};

export default CreateProfileRoute;
