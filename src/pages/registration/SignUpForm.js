import React, { useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAlertContext } from '../../context/AlertProvider';
import { validEmail } from '../../helper/validEmail';
import { verifyUserEmail } from '../../helper/verifyUserEmail';
import SignInWithGoogle from './SignInWithGoogle';
import { PrimaryButton1 } from '../../components/Buttons';
import { BasicInput, PasswordInput } from '../../components/InputFields';

// styles implemented in "../../styles/pages/registration/registrationForms.scss"

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
      <BasicInput type="email" placeholder="email" name="email" />
      <PasswordInput placeholder="password" name="password" />
      <PasswordInput placeholder="confirm password" name="confirmPassword" />

      <div className="buttons-container">
        <PrimaryButton1
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
        </PrimaryButton1>
        <SignInWithGoogle />
      </div>
    </form>
  );
};

export default SignUpForm;
