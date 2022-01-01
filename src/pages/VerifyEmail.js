import React from 'react';
import { PrimaryButton1 } from '../components/Buttons';
import LogoHeader from '../components/LogoHeader';
import { useCurrentUser } from '../context/CurrentUserProvider';
import { verifyUserEmail } from '../helper/emailVerification';
import { useAlertContext } from '../context/AlertProvider';

// styles implemented in "../styles/pages/verifyEmail.scss"

const VerifyEmail = () => {
  const user = useCurrentUser();
  const alertUser = useAlertContext();

  return (
    <div className="verify-email body-container">
      <LogoHeader />
      <h1>
        Please verify your email with the link sent to your registered email
        account.
      </h1>
      <h2>
        Didn't received verification link? Click the button to resend link.
      </h2>
      <PrimaryButton1
        onClick={() => {
          verifyUserEmail(user);
          alertUser('Verification link sent to email', 'success');
        }}
      >
        Resend Verification Link
      </PrimaryButton1>
    </div>
  );
};

export default VerifyEmail;
