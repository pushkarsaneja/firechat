import { sendEmailVerification } from 'firebase/auth';

export const verifyUserEmail = async user => {
  await sendEmailVerification(user, {
    url: 'https://pushkarsaneja.github.io/firechat/#/',
  });
};
