import React, { useState, createContext, useContext } from 'react';

const themeContext = createContext();

const Theme = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <themeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <div className={isDarkTheme ? 'dark-theme' : 'dark-theme light-theme'}>
        {children}
      </div>
    </themeContext.Provider>
  );
};

export default Theme;

export const useThemeContext = () => useContext(themeContext);
