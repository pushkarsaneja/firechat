import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAlertContext } from '../context/AlertProvider';
import { useCurrentUser } from '../context/CurrentUserProvider';
import { refreshUserToken } from '../helper/refreshUserToken';

const CreateProfileRoute = ({ children }) => {
  const user = useCurrentUser();
  const isLoggedIn = user;
  const isVerified = user ? user.emailVerified : false;
  const hasUsername = user ? user.username : false;
  const alertUser = useAlertContext();

  if (isLoggedIn) {
    if (isVerified) {
      refreshUserToken().catch(err => {
        alertUser(err.message, 'error');
      });
      if (!hasUsername) {
        return children;
      }
    }

    return <Navigate to="/" />;
  }

  return <Navigate to="/signin" />;
};

export default CreateProfileRoute;
