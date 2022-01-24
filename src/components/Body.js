import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BodyContainer = styled.div`
  min-height: ${props => 100 * props.vh}px;
`;

// Problem: The search bar on the top in mobile browsers hides on scrolling down.
//          So, 100vh is not consistent in mobile browsers.
// Solution: To dynamically get the dimensions of the viewport and have custom 1vh size.

// Body is a component that can be used as a container.

/*
analogous to a div with following properties
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: var(--backgroundColor);
  position: relative;
*/

// styles implemented in "../styles/components/body.scss"

const Body = ({ children, className = '' }) => {
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (isMounted) setCurrentHeight(window.innerHeight);
    });

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);
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
