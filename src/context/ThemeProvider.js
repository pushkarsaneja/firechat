import React, { useState, createContext, useContext } from 'react';

const themeContext = createContext();

/* A div encloses other components of the app inside it and provide the variables 
defined in the variables.scss file to the child elements. The setIsDarkTheme function
is provided to the children elements as context to toggle the state between true and false and 
add corresponding class to the enclosing div. If isDarkTheme is false, the dark-theme 
variables are overwritten by the variables in the light-theme class. */

// variables are declared in "../styles/variables.scss"

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  return (
    <themeContext.Provider value={setIsDarkTheme}>
      <div className={isDarkTheme ? 'dark-theme' : 'dark-theme light-theme'}>
        {children}
      </div>
    </themeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => useContext(themeContext);
