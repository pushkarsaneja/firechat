import React from 'react';

// styles implemented in "../styles/components/loader.scss"

// if circular is true, the loader-contaner has a border radius of 50%

const Loader = ({ circular }) => {
  return (
    <div className={`loader-container ${circular ? 'circular-loader' : ''}`}>
      <div></div>
    </div>
  );
};

export default Loader;
