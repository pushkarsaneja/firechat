import React, { useState } from 'react';
import googleIcon from '../assets/icons/google.jpeg';

const SignInForm = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  return (
    <div
      className={isSignInForm ? 'form-container' : 'form-container rotate-form'}
    >
      <div className="buttons-container">
        <button
          className={
            isSignInForm ? 'gradient-button' : 'gradient-button active'
          }
          type="button"
          onClick={() => {
            setIsSignInForm(false);
          }}
        >
          SignUp
        </button>
        <button
          className={
            isSignInForm ? 'gradient-button active' : 'gradient-button '
          }
          type="button"
          onClick={() => {
            setIsSignInForm(1);
          }}
        >
          SignIn
        </button>
      </div>

      <form className="signin">
        <input
          className="basic-input"
          type="email"
          placeholder="email"
          name="email"
          id="email"
        />
        <input
          className="basic-input"
          type="password"
          placeholder="password"
          id="password"
          name="password"
        />
        <div className="buttons-container">
          <button className="dark-button" type="button">
            Submit
          </button>
          <button className="dark-button" type="button">
            <img src={googleIcon} alt="" />{' '}
            <span className="button-text">Google</span>
          </button>
        </div>
      </form>

      <form className="signup">
        <input
          className="basic-input"
          type="email"
          placeholder="email"
          name="email"
          id="email"
        />
        <input
          className="basic-input"
          type="password"
          placeholder="password"
          id="password"
          name="password"
        />
        <input
          className="basic-input"
          type="password"
          placeholder="confirm password"
          id="confirm-password"
          name="confirmPassword"
        />
        <div className="buttons-container">
          <button className="dark-button" type="button">
            Submit
          </button>
          <button className="dark-button" type="button">
            <img src={googleIcon} alt="" />
            <span className="button-text">Google</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
