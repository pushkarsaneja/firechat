import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUserProvider';

const PublicRoute = ({ children }) => {
  const user = useCurrentUser();
  const isLoggedIn = user;

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;
