import React from 'react';
import googleIcon from '../../assets/icons/google.jpeg';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAlertContext } from '../../context/AlertProvider';
import { PrimaryButton1 } from '../../components/Buttons';

// returns a button that opens a popup for google signup/signin

const SignInWithGoogle = () => {
  const alertUser = useAlertContext();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      alertUser('Signed In Successfully', 'success');
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };
  return (
    <PrimaryButton1 onClick={signInWithGoogle}>
      <img src={googleIcon} alt="" /> <span>Google</span>
    </PrimaryButton1>
  );
};

export default SignInWithGoogle;
