import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { capitalizeFirst } from '../helper/capitalizeFirst';

const currentRecipientContext = createContext();
const setCurrentRecipientContext = createContext();

const CurrentRecipientProvider = ({ children }) => {
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [currentRecipientId, setCurrentRecipientId] = useState(null);
  useEffect(() => {
    let unsubDb = null;
    if (currentRecipientId) {
      unsubDb = onSnapshot(doc(db, 'users', currentRecipientId), snapshot => {
        const userData = snapshot.data();
        setCurrentRecipient({
          uid: currentRecipientId,
          firstName: capitalizeFirst(userData.firstName),
          lastName: capitalizeFirst(userData.lastName),
          username: userData.username,
          profilePicture: userData.profilePicture,
        });
      });
    } else {
      setCurrentRecipient(null);
    }

    return () => {
      if (unsubDb) unsubDb();
    };
  }, [currentRecipientId]);

  return (
    <currentRecipientContext.Provider value={currentRecipient}>
      <setCurrentRecipientContext.Provider value={setCurrentRecipientId}>
        {children}
      </setCurrentRecipientContext.Provider>
    </currentRecipientContext.Provider>
  );
};

export default CurrentRecipientProvider;

export const useCurrentRecipient = () => useContext(currentRecipientContext);
export const useSetCurrentRecipient = () =>
  useContext(setCurrentRecipientContext);
