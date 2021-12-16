import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = false; //to be replaced with state variable

  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
