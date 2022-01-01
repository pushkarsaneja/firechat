import React from 'react';

// styles implemented in "../styles/components/buttons.scss"

// if active, buttons have background of primary colour.
// if not active, buttons have transparent background and border of primary color.

export const PrimaryButton1 = ({ active, children, onClick }) => {
  return (
    <button
      type="button"
      className={`${active ? 'primary-button-1 active' : 'primary-button-1'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const PrimaryButton2 = ({ active, children, onClick }) => {
  return (
    <button
      type="button"
      className={`${active ? 'primary-button-2 active' : 'primary-button-2'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
