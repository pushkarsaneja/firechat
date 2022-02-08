import React, { useRef, useCallback } from 'react';
import { PrimaryButton1 } from '../../components/Buttons';
import ProfileImageEditor from '../../components/ProfileImageEditor';
import CreateUsernameInput from './CreateUsernameInput';
import Header from '../../components/Header';
import { useAlertContext } from '../../context/AlertProvider';
import Body from '../../components/Body';
import { updateUserData } from '../../helper/updateUserData';
import { useCurrentUser } from '../../context/CurrentUserProvider';

// styles implemented in "../../styles/pages/createProfile/createProfile.scss"

const CreateProfile = () => {
  const uniqueUsername = useRef(); // reference created to know if username is unique

  const alertUser = useAlertContext();
  const user = useCurrentUser();
  const saveButtonRef = useRef();

  console.log('Rerendered CreateProfile');

  // onSave updates the details of the user in the database if username is unique
  const onSave = useCallback(async () => {
    try {
      if (!formRef.current.firstName.value) {
        throw new Error('Please enter first name.');
      }
      if (!uniqueUsername.current) {
        throw new Error('Username is not valid');
      }
      await updateUserData(user.uid, {
        firstName: formRef.current.firstName.value.toLowerCase(),
        lastName: formRef.current.lastName.value.toLowerCase(),
        username: formRef.current.username.value.toLowerCase(),
      });
    } catch (err) {
      alertUser(err.message, 'error');
    }
  }, [uniqueUsername, alertUser, user.uid]);

  const formRef = useRef();
  return (
    <Body className="create-profile">
      <Header />
      <h1>Let's set up your profile: </h1>
      <form ref={formRef}>
        <ProfileImageEditor disableButtons={[saveButtonRef]} />
        <div>
          <label htmlFor="firstName">
            <h3>Enter your first name *</h3>
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
            <h3>Create a unique username *</h3>
          </label>
          <h5>Note: Username cannot be changed later.</h5>
          <CreateUsernameInput
            name="username"
            placeholder="username"
            id="username"
            type="text"
            ref={uniqueUsername}
          />
        </div>
        <PrimaryButton1
          active={true}
          onClick={onSave}
          id="save-profile-info"
          ref={saveButtonRef}
        >
          Save
        </PrimaryButton1>
      </form>
    </Body>
  );
};

export default CreateProfile;
