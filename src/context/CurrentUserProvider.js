import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { auth } from '../misc/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../misc/firebase';
import { useAlertContext } from './AlertProvider';
import Loader from '../components/Loader';

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
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
      });
      setIsLoading(false);
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
    const unsubAuth = onAuthStateChanged(auth, user => {
      if (user !== null) {
        getDoc(doc(db, 'users', user.uid))
          .then(snapshot => {
            if (snapshot.exists()) {
              unsubDb = listenUserDoc(user);
            } else {
              addUserToDatabase(user)
                .then(() => {
                  unsubDb = listenUserDoc(user);
                })
                .catch(err => {
                  alertUser(err.message, 'error');
                });
            }
          })
          .catch(err => {
            alertUser(err.message, 'error');
          });
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
      {isLoading && <Loader />}
      {!isLoading && children}
    </currentUserContext.Provider>
  );
};

export default CurrentUserProvider;
export const useCurrentUser = () => useContext(currentUserContext);
