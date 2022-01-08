import { doc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState, useCallback } from 'react';
import { PrimaryButton1 } from '../components/Buttons';
import CircularProfilePic from '../components/CircularProfilePic';
import CreateUsernameInput from '../components/CreateUsernameInput';
import LogoHeader from '../components/LogoHeader';
import { db } from '../misc/firebase';
import { useCurrentUser } from '../context/CurrentUserProvider';
import { useAlertContext } from '../context/AlertProvider';
import Body from '../components/Body';

// styles implemented in "../styles/pages/createProfile.scss"

const CreateProfile = () => {
  const [isUsernameUnique, setIsUsernameUnique] = useState(false);
  const alertUser = useAlertContext();

  console.log('Rerendered CreateProfile');

  const user = useCurrentUser();

  // onSave updates the details of the user in the database if username is unique
  const onSave = useCallback(async () => {
    try {
      if (isUsernameUnique) {
        await updateDoc(doc(db, 'users', user.uid), {
          firstName: formRef.current.firstName.value,
          lastName: formRef.current.lastName.value,
          username: formRef.current.username.value,
        });
      } else {
        throw new Error('Username is not valid');
      }
    } catch (err) {
      alertUser(err.message, 'error');
    }
  }, [isUsernameUnique, user, alertUser]);

  const formRef = useRef();

  return (
    <Body className="create-username">
      <LogoHeader />
      <h1>Let's set up your profile: </h1>
      <form className="create-username-form" ref={formRef}>
        <CircularProfilePic editable />
        <div>
          <label htmlFor="firstName">
            <h3>Enter your first name</h3>
          </label>
          <input
            className="basic-input"
            name="firstName"
            placeholder="first name"
            type="text"
            id="firstName"
          />
        </div>
        <div>
          <label htmlFor="lastName">
            <h3>Enter your last name</h3>
          </label>
          <input
            className="basic-input"
            name="lastName"
            placeholder="last name"
            type="text"
            id="lastName"
          />
        </div>

        <div>
          <label htmlFor="username">
            <h3>Create a unique username</h3>
          </label>
          <h5>Note: Username cannot be changed later.</h5>
          <CreateUsernameInput
            name="username"
            placeholder="username"
            id="username"
            type="text"
            isUsernameUnique={isUsernameUnique}
            setIsUsernameUnique={setIsUsernameUnique}
          />
        </div>
        <PrimaryButton1 active={true} onClick={onSave}>
          Save
        </PrimaryButton1>
      </form>
    </Body>
  );
};

export default CreateProfile;
