import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../misc/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const currentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setIsLoading(false);

      return () => {
        unsubAuth();
      };
    });
  }, []);

  console.log(currentUser);

  return (
    <currentUserContext.Provider value={currentUser}>
      {children}
    </currentUserContext.Provider>
  );
};

export default CurrentUserProvider;
export const useCurrentUser = () => useContext(currentUserContext);
