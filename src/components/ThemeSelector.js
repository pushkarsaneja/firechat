import React, { useState } from 'react';
import {
  useCurrentTheme,
  useUpdateCurrentTheme,
} from '../context/ThemeProvider';

const availableThemes = [
  'green',
  'blue',
  'orange',
  'purple',
  'maroon',
  'yellow',
];

// styles implemented in "../styles/components/themeSelector.scss"

// updates the current theme using contexts in ThemeProvider

const ThemeSelector = () => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const currentTheme = useCurrentTheme();
  const updateCurrentTheme = useUpdateCurrentTheme();

  return (
    <div className="theme-selector">
      <h3>Theme</h3>
      <button
        className="select-color"
        id="selected-color"
        onClick={() => setIsTrayOpen(prev => !prev)}
      >
        <div />
      </button>
      <div className={`theme-tray ${isTrayOpen ? 'open' : 'close'}`}>
        {availableThemes.map((color, index) => {
          return (
            currentTheme !== color && (
              <button
                key={index}
                className={`select-color ${color}-theme`}
                onClick={() => {
                  setIsTrayOpen(false);
                  updateCurrentTheme(color);
                }}
              >
                <div />
              </button>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
