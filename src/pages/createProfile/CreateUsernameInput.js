import React, { useEffect, useState, forwardRef } from 'react';
import { getDocs, query, where } from 'firebase/firestore';
import { useAlertContext } from '../../context/AlertProvider';
import { BasicInput } from '../../components/InputFields';
import { useFixedReference } from '../../context/DbReferenceProvider';

// styles implemented in "../../styles/pages/createProfile/createUsernameInput.scss"

// this component returns a modified input field that checks if username is valid or not
// takes a reference to avoid rerenders
// the reference.current is set to true if username is valid
// read https://reactjs.org/docs/forwarding-refs.html

const CreateUsernameInput = forwardRef(
  ({ name, placeholder, type, id }, ref) => {
    const [isUsernameUnique, setIsUsernameUnique] = useState(false);
    const usersCollection = useFixedReference().usersCollection;
    const alertUser = useAlertContext();

    useEffect(() => {
      ref.current = isUsernameUnique;
    });

    const checkUsername = async username => {
      const getUsername = query(
        usersCollection,
        where('username', '==', username.toLowerCase())
      ); // firebase query fetches documents with the username in the input
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
        <BasicInput
          name={name}
          placeholder={placeholder}
          type={type}
          id={id}
          onChange={e => {
            checkUsername(e.target.value);
          }}
        />
        {
          !isUsernameUnique && (
            <i className="fas fa-times" />
          ) /* show cross ❌ */
        }
        {isUsernameUnique && <i className="fas fa-check" /> /* show check ✔️*/}
      </div>
    );
  }
);

export default CreateUsernameInput;
