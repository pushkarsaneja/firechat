import React from 'react';

// styles implemented in "../styles/components/logo.scss"

const Logo = ({ size }) => {
  return (
    <div className={`logo-container font-size-${size}rem`}>
      <i className="fas fa-fire logo" />
    </div>
  );
};

export default Logo;
