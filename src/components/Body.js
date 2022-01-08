import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BodyContainer = styled.div`
  min-height: ${props => 100 * props.vh}px;
`;

// custom body container to keep consistency between in mobile devices
/*
analogous to a div with following properties
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: var(--backgroundColor);
  position: relative;
*/

const Body = ({ children, className = '' }) => {
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setCurrentHeight(window.innerHeight);
    });
  }, []);
  return (
    <BodyContainer
      className={`body-container ${className}`}
      vh={currentHeight * 0.01}
    >
      {children}
    </BodyContainer>
  );
};

export default Body;
