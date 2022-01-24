import React, { memo } from 'react';
import Logo from './Logo';
import ThemeSelector from './ThemeSelector';

// styles implemented in "../styles/components/header.scss"

// if hideThemeSelector is passed as a prop to header, it hides the theme selector

const Header = ({ hideThemeSelector = false }) => {
  return (
    <header className="header">
      <div className="logo-name">
        <Logo size={3} />
        <h2>Fire Chat</h2>
      </div>
      {!hideThemeSelector && <ThemeSelector />}
    </header>
  );
};

export default memo(Header);
