import React from 'react';

const GradientLogo = ({ size }) => {
  return (
    <div className={`logo-container font-size-${size}rem`}>
      <i className="fas fa-fire logo" />
    </div>
  );
};

export default GradientLogo;
