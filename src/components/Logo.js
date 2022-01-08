import React from 'react';
import styled from 'styled-components';

// styles implemented in "../styles/components/logo.scss"

const LogoContainer = styled.div`
  font-size: ${props => props.size}rem;
`;
// specify size in rems
const Logo = ({ size }) => {
  return (
    <LogoContainer className="logo-container" size={size}>
      <i className="fas fa-fire logo" />
    </LogoContainer>
  );
};

export default Logo;
