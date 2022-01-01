import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../misc/firebase';
import { useAlertContext } from '../context/AlertProvider';
import SignInWithGoogle from './SignInWithGoogle';
import { PrimaryButton2 } from './Buttons';

// styles implemented in "../styles/components/signIn&UpForm.scss"

const SignInForm = () => {
  const alertUser = useAlertContext();
  const signInFormRef = useRef();

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  return (
    <form className="signin" ref={signInFormRef}>
      <input
        className="basic-input"
        type="email"
        placeholder="email"
        name="email"
      />
      <input
        className="basic-input"
        type="password"
        placeholder="password"
        name="password"
      />
      <div className="buttons-container">
        <PrimaryButton2
          active={true}
          onClick={() => {
            signInWithEmail(
              signInFormRef.current.email.value,
              signInFormRef.current.password.value
            );
          }}
        >
          Submit
        </PrimaryButton2>
        <SignInWithGoogle />
      </div>
    </form>
  );
};

export default SignInForm;
