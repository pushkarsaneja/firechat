import { getIdToken } from 'firebase/auth';
import { auth } from '../misc/firebase';

export const refreshUserToken = async () => {
  await getIdToken(auth.currentUser, true);
};
