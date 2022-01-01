import React from 'react';
import { PrimaryButton1 } from '../components/Buttons';
import CircularProfilePic from '../components/CircularProfilePic';
import LogoHeader from '../components/LogoHeader';

// styles implemented in "../styles/pages/createUsername.scss"

const CreateProfile = () => {
  return (
    <div className="body-container create-username">
      <LogoHeader />
      <h1>Let's set up your profile: </h1>
      <form className="create-username-form">
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
          <input
            className="basic-input"
            name="username"
            placeholder="username"
            type="text"
            id="username"
          />
        </div>

        <PrimaryButton1 active={true}>Save</PrimaryButton1>
      </form>
    </div>
  );
};

export default CreateProfile;
