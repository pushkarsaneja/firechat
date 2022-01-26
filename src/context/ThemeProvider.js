import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAlertContext } from './AlertProvider';

const updateThemeContext = createContext();
const currentThemeContext = createContext();

/* A div encloses other components of the app inside it and provide the variables 
defined in the variables.scss file to the child elements. The setIsDarkTheme function
is provided to the children elements as context to toggle the state between true and false and 
add corresponding class to the enclosing div. If isDarkTheme is false, the dark-theme 
variables are overwritten by the variables in the light-theme class. */

// variables are declared in "../styles/variables.scss"

const ThemeProvider = ({ children }) => {
  const alertUser = useAlertContext();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async user => {
      if (user !== null) {
        setCurrentUser(user);
        try {
          const snapshot = await getDoc(
            doc(db, 'users', user.uid, 'miscInfo', 'theme')
          );
          if (!snapshot.data().color) throw new Error('');
          setCurrentTheme(snapshot.data().color);
        } catch (err) {
          setCurrentTheme(prev => prev);
        }
      } else {
        setCurrentUser(null);
      }
      return () => {
        unsubAuth();
      };
    });
  }, [alertUser, currentTheme]);

  const updateCurrentTheme = useCallback(
    color => {
      if (currentUser) {
        updateDoc(doc(db, 'users', auth.currentUser.uid, 'miscInfo', 'theme'), {
          color: color,
        })
          .then(() => {
            setCurrentTheme(color);
          })
          .catch(err => {
            alertUser(err.message, 'error');
          });
      }
    },
    [alertUser, currentUser]
  );
  return (
    <currentThemeContext.Provider value={currentTheme}>
      <updateThemeContext.Provider value={updateCurrentTheme}>
        <div className={`base-theme ${currentTheme}-theme`}>{children}</div>
      </updateThemeContext.Provider>
    </currentThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useUpdateCurrentTheme = () => useContext(updateThemeContext);
export const useCurrentTheme = () => useContext(currentThemeContext);
