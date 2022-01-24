import React from 'react';
import { PrimaryButton1 } from '../../components/Buttons';
import Header from '../../components/Header';
import { verifyUserEmail } from '../../helper/verifyUserEmail';
import { useAlertContext } from '../../context/AlertProvider';
import Body from '../../components/Body';
import { useCurrentUser } from '../../context/CurrentUserProvider';

// styles implemented in "../../styles/pages/verifyEmail/verifyEmail.scss"

const VerifyEmail = () => {
  const alertUser = useAlertContext();
  const user = useCurrentUser();
  return (
    <Body className="verify-email">
      <Header />
      <h2>
        Please verify your email with the link sent to your registered email
        account.
      </h2>
      <h3>
        Didn't received verification link? Click the button to resend link.
      </h3>
      <PrimaryButton1
        onClick={async () => {
          try {
            await verifyUserEmail(user.userObj);
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
