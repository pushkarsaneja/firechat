import { sendEmailVerification } from 'firebase/auth';

export const verifyUserEmail = async user => {
  await sendEmailVerification(user, {
    url: 'http://localhost:3000/',
  });
};
