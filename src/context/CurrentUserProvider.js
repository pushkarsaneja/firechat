import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAlertContext } from './AlertProvider';
import FullScreenLoader from '../components/FullScreenLoader';

//this context provides current signed in user details
const currentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const alertUser = useAlertContext();

  //listenUserDoc listens to userdata in the database and resets the data in currentUser state
  //function returns an unsubscribe function, should be used in cleanup function

  const listenUserDoc = user =>
    onSnapshot(doc(db, 'users', user.uid), snapshot => {
      const userData = snapshot.data();
      setCurrentUser({
        userObj: user,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: user.email,
        emailVerified: user.emailVerified,
        profilePicture: userData.profilePicture,
        uid: user.uid,
      });
    });

  //addUserToDatabase creates a document under users collection with user id as document id
  const addUserToDatabase = useCallback(
    async user => {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          firstName: '',
          lastName: '',
          username: null,
          lastSeen: '',
          active: true,
          email: user.email,
          profilePicture: '',
        });

        await setDoc(doc(db, 'users', user.uid, 'miscInfo', 'theme'), {
          color: 'blue',
        });
      } catch (err) {
        alertUser(err.message, 'error');
      }
    },
    [alertUser]
  );

  useEffect(() => {
    //if user is signed in, checks if user is added to database
    //if user is added to database, listen the user document
    //else create a document for the user and start listening to the document

    let unsubDb;
    const unsubAuth = onAuthStateChanged(auth, async user => {
      if (user !== null) {
        try {
          const snapshot = await getDoc(doc(db, 'users', user.uid));
          if (snapshot.exists()) {
            unsubDb = listenUserDoc(user);
          } else {
            await addUserToDatabase(user);
            unsubDb = listenUserDoc(user);
          }
        } catch (err) {
          alertUser(err.message, 'error');
        } finally {
          setIsLoading(false);
        }
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }

      return () => {
        unsubAuth();
        if (unsubDb) {
          unsubDb();
        }
      };
    });
  }, [alertUser, addUserToDatabase]);

  console.log(currentUser);

  return (
    <currentUserContext.Provider value={currentUser}>
      {isLoading && <FullScreenLoader />}
      {!isLoading && children}
    </currentUserContext.Provider>
  );
};

export default CurrentUserProvider;
export const useCurrentUser = () => useContext(currentUserContext);
