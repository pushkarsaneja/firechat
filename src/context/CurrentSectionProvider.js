import React, { useState, useContext, createContext } from 'react';

const currentSectionContext = createContext();
const setCurrentSectionContext = createContext();

const CurrentSectionProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('contacts'); //'contacts'|'chat-room'

  return (
    <currentSectionContext.Provider value={currentSection}>
      <setCurrentSectionContext.Provider value={setCurrentSection}>
        {children}
      </setCurrentSectionContext.Provider>
    </currentSectionContext.Provider>
  );
};

export default CurrentSectionProvider;

export const useCurrentSection = () => useContext(currentSectionContext);
export const useSetCurrentSection = () => useContext(setCurrentSectionContext);
