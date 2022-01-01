import React from 'react';
import googleIcon from '../assets/icons/google.jpeg';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../misc/firebase';
import { useAlertContext } from '../context/AlertProvider';
import { PrimaryButton2 } from './Buttons';

const SignInWithGoogle = () => {
  const alertUser = useAlertContext();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };
  return (
    <PrimaryButton2 onClick={signInWithGoogle}>
      <img src={googleIcon} alt="" />
      <span className="button-text">Google</span>
    </PrimaryButton2>
  );
};

export default SignInWithGoogle;
