import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAlertContext } from '../../context/AlertProvider';
import SignInWithGoogle from './SignInWithGoogle';
import { PrimaryButton1 } from '../../components/Buttons';
import { BasicInput, PasswordInput } from '../../components/InputFields';

// styles implemented in "../../styles/pages/registration/registrationForms.scss"

const SignInForm = () => {
  const alertUser = useAlertContext();
  const signInFormRef = useRef();

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alertUser('SignIn Successful', 'success');
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  return (
    <form className="signin" ref={signInFormRef}>
      <BasicInput type="email" placeholder="email" name="email" />
      <PasswordInput placeholder="password" name="password" />
      <div className="buttons-container">
        <PrimaryButton1
          active={true}
          onClick={() => {
            signInWithEmail(
              signInFormRef.current.email.value,
              signInFormRef.current.password.value
            );
          }}
        >
          Submit
        </PrimaryButton1>
        <SignInWithGoogle />
      </div>
      <PrimaryButton1
        active
        onClick={() => {
          signInWithEmail('motot59951@plexfirm.com', 'password');
        }}
        slim
      >
        Demo Login (Phineas)
      </PrimaryButton1>
      <PrimaryButton1
        active
        onClick={() => {
          signInWithEmail('petig79253@goonby.com', 'password');
        }}
        slim
      >
        Demo Login (Ferb)
      </PrimaryButton1>
    </form>
  );
};

export default SignInForm;
