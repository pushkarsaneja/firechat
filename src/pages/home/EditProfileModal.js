import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAlertContext } from '../../context/AlertProvider';
import { useCurrentUser } from '../../context/CurrentUserProvider';
import { auth } from '../../firebase/firebase';
import { updateUserData } from '../../helper/updateUserData';
import { IconAsButton, PrimaryButton1 } from '../../components/Buttons';
import ProfileImageEditor from '../../components/ProfileImageEditor';

//styles implemented in '../../styles/pages/home/editProfileModal.scss'

const EditProfileModal = ({ setIsModalOpen }) => {
  const currentUser = useCurrentUser();
  const alertUser = useAlertContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
    }
  }, [currentUser]);

  const updateData = async data => {
    try {
      await updateUserData(currentUser.uid, data);
      alertUser('Profile updated', 'success');
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  return (
    <div className="edit-profile-modal">
      <IconAsButton
        className="close-modal"
        onClick={() => {
          setIsModalOpen(prev => !prev);
        }}
      >
        <i className="fas fa-arrow-left back" />
      </IconAsButton>

      <h1 className="modal-heading">My Profile</h1>
      <div className="update-profile-container">
        <ProfileImageEditor />
        <div className="my-username">@{currentUser.username}</div>

        <div className="edit-first-name">
          <div>First Name: </div>
          <div className="input-container">
            <input
              id="editFirstName"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
            {firstName === currentUser.firstName && (
              <label htmlFor="editFirstName">
                <i className="fas fa-pen" />
              </label>
            )}
            {firstName !== currentUser.firstName && (
              <IconAsButton
                onClick={() => {
                  updateData({ firstName: firstName.toLowerCase() });
                }}
              >
                <i className="fas fa-check" />
              </IconAsButton>
            )}
          </div>
        </div>
        <div className="edit-last-name">
          <div>Last Name: </div>
          <div className="input-container">
            <input
              id="editLastName"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
            {lastName === currentUser.lastName && (
              <label htmlFor="editLastName">
                <i className="fas fa-pen" />
              </label>
            )}
            {lastName !== currentUser.lastName && (
              <IconAsButton
                onClick={() => {
                  updateData({ lastName: lastName.toLowerCase() });
                }}
              >
                <i className="fas fa-check" />
              </IconAsButton>
            )}
          </div>
        </div>
        <PrimaryButton1
          active
          className="logout-btn"
          onClick={() => {
            signOut(auth)
              .then(() => {
                alertUser('SignOut successful', 'success');
              })
              .catch(() => {
                alertUser('Please try again', 'error');
              });
          }}
        >
          SignOut
        </PrimaryButton1>
      </div>
    </div>
  );
};

export default EditProfileModal;
