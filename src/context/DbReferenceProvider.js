import { collection, doc } from 'firebase/firestore';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { useCurrentRecipient } from './CurrentRecipientProvider';
import { useCurrentUser } from './CurrentUserProvider';

const fixedReferenceContext = createContext();
const referenceContext = createContext();

//this context provides the references to all collections and documents
const DbReferenceProvider = ({ children }) => {
  const [fixedReference, setFixedReference] = useState(null);
  const [reference, setReference] = useState(null);
  const currentUser = useCurrentUser();
  const currentRecipient = useCurrentRecipient();

  useEffect(() => {
    const usersCollection = collection(db, 'users');
    let miscInfoCollection = null;
    let directChatsCollection = null;
    let userDocument = null;
    let themeDocument = null;

    if (currentUser) {
      miscInfoCollection = collection(db, 'users', currentUser.uid, 'miscInfo');
      directChatsCollection = collection(
        db,
        'users',
        currentUser.uid,
        'directChats'
      );

      userDocument = (docId = currentUser.uid) => {
        return doc(db, 'users', docId);
      };

      themeDocument = () => {
        return doc(db, 'users', currentUser.uid, 'theme');
      };
    }

    setFixedReference({
      usersCollection,
      miscInfoCollection,
      directChatsCollection,
      userDocument,
      themeDocument,
    });
  }, [currentUser]);

  useEffect(() => {
    let messagesCollection = null;
    let messagesCollectionFlip = null;
    let recipientDocument = null;
    let recipientDocumentFlip = null;
    let messageDocument = null;
    let messageDocumentFlip = null;

    if (currentUser) {
      messagesCollection = (
        recipientId = currentRecipient ? currentRecipient.uid : ''
      ) => {
        if (recipientId) {
          return collection(
            db,
            'users',
            currentUser.uid,
            'directChats',
            recipientId,
            'messages'
          );
        } else {
          return null;
        }
      };

      messagesCollectionFlip = (
        recipientId = currentRecipient ? currentRecipient.uid : ''
      ) => {
        if (recipientId) {
          return collection(
            db,
            'users',
            recipientId,
            'directChats',
            currentUser.uid,
            'messages'
          );
        } else {
          return null;
        }
      };

      recipientDocument = (
        recipientId = currentRecipient ? currentRecipient.uid : ''
      ) => {
        if (recipientId) {
          return doc(db, 'users', currentUser.uid, 'directChats', recipientId);
        } else {
          return null;
        }
      };

      recipientDocumentFlip = (
        recipientId = currentRecipient ? currentRecipient.uid : ''
      ) => {
        if (recipientId) {
          return doc(db, 'users', recipientId, 'directChats', currentUser.uid);
        } else {
          return null;
        }
      };

      messageDocument = (
        mssgId,
        recipientId = currentRecipient ? currentRecipient.uid : ''
      ) => {
        if (recipientId) {
          return doc(
            db,
            'users',
            currentUser.uid,
            'directChats',
            recipientId,
            'messages',
            mssgId
          );
        } else {
          return null;
        }
      };

      messageDocumentFlip = (
        mssgId,
        recipientId = currentRecipient ? currentRecipient.uid : ''
      ) => {
        if (recipientId) {
          return doc(
            db,
            'users',
            recipientId,
            'directChats',
            currentUser.uid,
            'messages',
            mssgId
          );
        } else {
          return null;
        }
      };
    }

    setReference({
      messagesCollection,
      messagesCollectionFlip,
      recipientDocument,
      recipientDocumentFlip,
      messageDocument,
      messageDocumentFlip,
    });
  }, [currentRecipient, currentUser]);
  return (
    <fixedReferenceContext.Provider value={fixedReference}>
      <referenceContext.Provider value={reference}>
        {children}
      </referenceContext.Provider>
    </fixedReferenceContext.Provider>
  );
};

export default DbReferenceProvider;
export const useFixedReference = () => useContext(fixedReferenceContext);
export const useReference = () => useContext(referenceContext);
