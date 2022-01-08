import React from 'react';
import Body from './Body';

// styles implemented in "../styles/components/loader.scss"

const Loader = () => {
  return (
    <Body className="loader">
      <i className="fas fa-spinner" />
    </Body>
  );
};

export default Loader;
