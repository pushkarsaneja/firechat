import React from 'react';
import Body from './Body';

// styles implemented in "../styles/components/fullScreenloader.scss"

const FullScreenLoader = () => {
  return (
    <Body className="full-screen-loader">
      <div id="loading"></div>
    </Body>
  );
};

export default FullScreenLoader;
