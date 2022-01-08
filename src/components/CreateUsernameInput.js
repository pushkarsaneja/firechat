import React from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../misc/firebase';
import { useAlertContext } from '../context/AlertProvider';

// styles implemented in "../styles/components/createUsernameInput.scss"

// this component returns a modified input field that checks if username is valid or not
// setIsUsernameUnique sets a state true if username is unique else false

const CreateUsernameInput = ({
  name,
  placeholder,
  type,
  id,
  isUsernameUnique,
  setIsUsernameUnique,
}) => {
  const users = collection(db, 'users');
  const alertUser = useAlertContext();

  const checkUsername = async username => {
    const getUsername = query(users, where('username', '==', username)); // firebase query fetches documents with the username in the input
    try {
      const snapshot = await getDocs(getUsername);
      if (snapshot.empty) {
        setIsUsernameUnique(true && Boolean(username)); //empty username cannot be valid username
      } else {
        setIsUsernameUnique(false);
      }
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  return (
    <div className="create-username-input-container">
      <input
        className="basic-input"
        name={name}
        placeholder={placeholder}
        type={type}
        id={id}
        onChange={e => {
          checkUsername(e.target.value);
        }}
      />
      {!isUsernameUnique && <i className="fas fa-times" /> /* show cross ❌ */}
      {isUsernameUnique && <i className="fas fa-check" /> /* show check ✔️*/}
    </div>
  );
};

export default CreateUsernameInput;
