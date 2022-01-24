import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAlertContext } from '../context/AlertProvider';
import { useCurrentUser } from '../context/CurrentUserProvider';
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const CreateProfileRoute = ({ children }) => {
  const user = useCurrentUser();
  const isLoggedIn = user;
  const isVerified = user ? user.emailVerified : false;
  const hasUsername = user ? user.username : false;
  const alertUser = useAlertContext();

  if (isLoggedIn) {
    if (isVerified) {
      (async () => {
        try {
          if (user) await getIdToken(auth.currentUser, true);
        } catch (err) {
          alertUser(err.message, 'error');
        }
      })();
      if (!hasUsername) {
        return children;
      }
    }

    return <Navigate to="/" />;
  }

  return <Navigate to="/register" />;
};

export default CreateProfileRoute;
