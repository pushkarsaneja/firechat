import React from 'react';
import noProfile from '../assets/images/no_profile_cropped.png';

//styles implemented in '../styles/components/displayPic.scss'

const DisplayPic = ({ imageUrl, online, onClick }) => {
  return (
    <div className={`display-pic ${online ? 'online' : ''}`} onClick={onClick}>
      <img src={imageUrl ? imageUrl : noProfile} alt="profile" />
    </div>
  );
};

export default DisplayPic;
