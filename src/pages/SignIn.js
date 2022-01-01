import React, { useState } from 'react';
import { PrimaryButton1 } from '../components/Buttons';
import Logo from '../components/Logo';
import LogoHeader from '../components/LogoHeader';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const SignIn = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  return (
    <div className="sign-in-page body-container">
      <LogoHeader />

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
              <PrimaryButton1
                active={!isSignInForm}
                onClick={() => {
                  setIsSignInForm(false);
                }}
              >
                SignUp
              </PrimaryButton1>
              <PrimaryButton1
                active={isSignInForm}
                onClick={() => {
                  setIsSignInForm(true);
                }}
              >
                SignIn
              </PrimaryButton1>
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
    </div>
  );
};

export default SignIn;
