import React from 'react';
import Logo from './Logo';

// styles implemented in "../styles/components/logoHeader.scss"

const LogoHeader = () => {
  return (
    <div className="logo-header">
      <Logo size={3} />
      <h2>Fire Chat</h2>
    </div>
  );
};

export default LogoHeader;
