import React, { useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../misc/firebase';
import { useAlertContext } from '../context/AlertProvider';
import { validEmail } from '../helper/emailValidation';
import { verifyUserEmail } from '../helper/emailVerification';
import SignInWithGoogle from './SignInWithGoogle';
import { PrimaryButton2 } from './Buttons';

// styles implemented in "../styles/components/signIn&UpForm.scss"

const SignUpForm = () => {
  const alertUser = useAlertContext();
  const signUpFormRef = useRef();

  const signUpWithEmail = async (email, password, confirmPassword) => {
    try {
      if (email.length === 0) {
        throw new Error('Please Enter Email');
      }
      if (!validEmail(email)) {
        throw new Error('Invalid Email');
      }
      if (password.length < 6) {
        throw new Error('The password should be atleast 6 characters long.');
      }
      if (password !== confirmPassword) {
        throw new Error('The passwords do not match. Please try again!');
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await verifyUserEmail(userCredential.user);
      alertUser('Verification link sent to email', 'success');
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  return (
    <form className="signup" ref={signUpFormRef}>
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
      <input
        className="basic-input"
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
      />
      <div className="buttons-container">
        <PrimaryButton2
          active={true}
          onClick={() => {
            signUpWithEmail(
              signUpFormRef.current.email.value,
              signUpFormRef.current.password.value,
              signUpFormRef.current.confirmPassword.value
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

export default SignUpForm;
