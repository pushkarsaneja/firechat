import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import noProfile from '../assets/images/no_profile.png';
import { FileSelector, PrimaryButton1, CloseButton } from './Buttons';
import { useAlertContext } from '../context/AlertProvider';
import { storage } from '../firebase/firebase';
import {
  deleteObject,
  ref,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import { updateUserData } from '../helper/updateUserData';
import Loader from './Loader';
import { useCurrentUser } from '../context/CurrentUserProvider';
import AvatarEditor from 'react-avatar-editor';

// styled-component
const CircularProfilePic = styled.div`
  background-image: url(${props =>
    props.imageUrl ? props.imageUrl : noProfile});
  background-size: ${props => (props.imageUrl ? '100' : '125')}%;
`;

// styles implemented in "../styles/components/profileImageEditor.scss"

// disableButtons is an array of button refs you want to disable while the image editor is open

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const ProfileImageEditor = ({ disableButtons = [] }) => {
  const [imageFile, setImageFile] = useState(null);
  const [inProcess, setInProcess] = useState(true); // used to set a loader if some process is ongoing
  const [zoom, setZoom] = useState(1);
  const alertUser = useAlertContext();
  const user = useCurrentUser();
  const rootRef = ref(storage);
  const profilePicRef = ref(rootRef, `profilePictures/${user.uid}`);
  const croppedImgRef = useRef();

  // the use effect below disables the buttons whose refs are provided in the disableButtons prop as an array
  // the disable-button class is defined in '../styles/components/buttons.scss'

  useEffect(() => {
    if (user) setInProcess(false);
    disableButtons.forEach(btn => {
      if (imageFile) {
        btn.current.disabled = true;
        btn.current.classList.add('disable-button');
      } else {
        btn.current.disabled = false;
        btn.current.classList.remove('disable-button');
      }
    });
  }, [disableButtons, imageFile, user]);

  // onSelectFile function checks the file type and toggles the state to open ProfileImageEditor

  const onSelectFile = e => {
    const file = e.target.files[0];

    if (file && acceptedFileTypes.includes(file.type)) {
      setImageFile(file);
    } else {
      alertUser(
        `The selected file is not an image. Please select an image.`,
        'error'
      );
    }
  };

  // onRemovePhoto function deletes the image from storage and updates firestore database

  const onRemovePhoto = async () => {
    try {
      setInProcess(true);
      await deleteObject(profilePicRef);
      await updateUserData(user.uid, { profilePicture: '' });
      alertUser('Profile Picture has been removed.', 'success');
    } catch (err) {
      alertUser(err.message, 'error');
    } finally {
      setInProcess(false);
    }
  };

  // receiveBlob is a callback function that receives the blob object and uploads it to the storage
  // and updates firestore database
  const receiveBlob = async blob => {
    try {
      if (blob) await uploadBytes(profilePicRef, blob);
      const url = await getDownloadURL(profilePicRef);
      await updateUserData(user.uid, { profilePicture: url });
      setImageFile(null);
      alertUser('Profile Picture has been updated.', 'success');
    } catch (err) {
      alertUser(err.message, 'error');
    } finally {
      setInProcess(false);
    }
  };

  // uploadImage function gets the cropped image and initiates the upload process
  const uploadImage = e => {
    setInProcess(true);
    const croppedImg = croppedImgRef.current.getImageScaledToCanvas(); // returns a canvas element
    croppedImg.toBlob(receiveBlob);
  };

  return (
    <>
      {/* PREVIEW IMAGE */}
      {!imageFile && (
        <div className="profile-photo-container">
          <CircularProfilePic
            className="circular-profile-pic"
            imageUrl={user.profilePicture}
          >
            {inProcess && <Loader circular />}
            <FileSelector
              active
              className="image-selector"
              id="uploadImage"
              accept=".jpeg,.png,.jpg"
              onChange={e => {
                onSelectFile(e);
              }}
            >
              <i className="fas fa-pen" />
            </FileSelector>
          </CircularProfilePic>

          <PrimaryButton1
            slim
            onClick={() => {
              onRemovePhoto();
            }}
            disabled={inProcess}
            hide={!user.profilePicture}
            className="remove-photo-btn"
          >
            Remove Photo
          </PrimaryButton1>
        </div>
      )}

      {/*IMAGE EDITOR  */}

      {imageFile && (
        <div className="image-editor">
          {/* https://www.npmjs.com/package/react-avatar-editor */}
          <div className="canvas-container">
            {inProcess && <Loader circular />}
            <AvatarEditor
              ref={croppedImgRef}
              image={imageFile}
              width={250}
              height={250}
              border={0}
              borderRadius={100}
              rotate={0}
              scale={zoom}
            ></AvatarEditor>
          </div>

          <input
            className="slider"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={zoom}
            onChange={e => {
              setZoom(Number(e.target.value));
            }}
          />

          <PrimaryButton1
            active
            onClick={() => {
              uploadImage();
            }}
            disabled={inProcess}
            className="use-img-btn"
          >
            Use
          </PrimaryButton1>

          <CloseButton
            className="close-editor"
            onClick={() => {
              setImageFile(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default ProfileImageEditor;
