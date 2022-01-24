import React, { useState } from 'react';
import { PrimaryButton2 } from '../../components/Buttons';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Body from '../../components/Body';

// styles implemented in '../../styles/pages/registration/registration.scss'

const Registration = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  return (
    <Body className="sign-in-page">
      <Header hideThemeSelector />

      <div className="main-container">
        <div className="left-section">
          <h2>
            Real Time <span>Chat Application</span>
          </h2>

          {/* Rotatable form container */}

          <div
            className={
              isSignInForm ? 'form-container' : 'form-container rotate-form'
            }
          >
            <div className="buttons-container">
              <PrimaryButton2
                active={!isSignInForm}
                onClick={() => {
                  setIsSignInForm(false);
                }}
              >
                SignUp
              </PrimaryButton2>
              <PrimaryButton2
                active={isSignInForm}
                onClick={() => {
                  setIsSignInForm(true);
                }}
              >
                SignIn
              </PrimaryButton2>
            </div>
            {!isSignInForm && <SignUpForm />}
            {isSignInForm && <SignInForm />}
          </div>
        </div>
        <div className="right-section">
          <Logo size={25} />
          <h1>Fire Chat</h1>
        </div>
      </div>
    </Body>
  );
};

export default Registration;
