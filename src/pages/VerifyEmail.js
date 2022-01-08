import React from 'react';
import { PrimaryButton1 } from '../components/Buttons';
import LogoHeader from '../components/LogoHeader';
import { useCurrentUser } from '../context/CurrentUserProvider';
import { verifyUserEmail } from '../helper/emailVerification';
import { useAlertContext } from '../context/AlertProvider';
import Body from '../components/Body';

// styles implemented in "../styles/pages/verifyEmail.scss"

const VerifyEmail = () => {
  const user = useCurrentUser();
  const alertUser = useAlertContext();

  return (
    <Body className="verify-email">
      <LogoHeader />
      <h1>
        Please verify your email with the link sent to your registered email
        account.
      </h1>
      <h2>
        Didn't received verification link? Click the button to resend link.
      </h2>
      <PrimaryButton1
        onClick={async () => {
          try {
            verifyUserEmail(user);
            alertUser('Verification link sent to email', 'success');
          } catch (err) {
            alertUser(err.message, 'error');
          }
        }}
      >
        Resend Verification Link
      </PrimaryButton1>
      <PrimaryButton1
        active
        onClick={() => {
          /*eslint-disable*/
          location.reload();
          /*eslint-enable*/
        }}
      >
        Verified? Continue Here
      </PrimaryButton1>
    </Body>
  );
};

export default VerifyEmail;
