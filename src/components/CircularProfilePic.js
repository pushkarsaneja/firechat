import React, { useState } from 'react';
import styled from 'styled-components';
import noProfile from '../assets/images/no_profile.png';

// styled-component
const ProfilePhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  position: relative;
  .circular-profile-pic {
    background-image: url(${props =>
      props.imageUrl ? props.imageUrl : noProfile});
    background-size: ${props => (props.imageUrl ? '100' : '125')}%;
  }
`;

// styles implemented in "../styles/components/circularProfilePic.scss"

// if the circularProfilePic is editable, it shows an edit icon
// imageUrl takes the current image Url
// setProfileImage is the function from profileImageContext that
// will change set the new profile photo.

const CircularProfilePic = ({
  editable = false,
  imageUrl = '',
  setProfileImage = null,
}) => {
  const [imageLocation, setImageLocation] = useState(imageUrl);
  return (
    <>
      <ProfilePhotoContainer
        imageUrl={imageUrl}
        className="profile-photo-container"
      >
        <div className="circular-profile-pic" />
        {editable && (
          <label htmlFor="uploadImage">
            <i className="fas fa-pen" />
          </label>
        )}
        <input
          type="file"
          id="uploadImage"
          accept="image/*"
          name="imagePath"
          onChange={e => {
            setImageLocation(e.target.files[0]);
          }}
        />
      </ProfilePhotoContainer>
    </>
  );
};

export default CircularProfilePic;
