import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLoggedIn = false; // to be replace with state variable

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;
