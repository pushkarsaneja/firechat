import React from 'react';
import GradientLogo from '../components/GradientLogo';
import SignInForm from '../components/SignInForm';

const SignIn = () => {
  return (
    <div className="sign-in-page body-container">
      <div className="left-section">
        <div className="app-logo-name">
          <GradientLogo size={3} />
          <h2>Fire Chat</h2>
        </div>
        <h2>
          Real Time <span>Chat Application</span>
        </h2>
        <SignInForm />
      </div>
      <div className="right-section">
        <GradientLogo size={25} />
        <h1>Fire Chat</h1>
      </div>
    </div>
  );
};

export default SignIn;
