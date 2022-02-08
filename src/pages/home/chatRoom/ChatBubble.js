import {
  deleteDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { IconAsButton, PrimaryButton2 } from '../../../components/Buttons';
import { useAlertContext } from '../../../context/AlertProvider';
import { useCurrentRecipient } from '../../../context/CurrentRecipientProvider';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import { useReference } from '../../../context/DbReferenceProvider';

// styles implemented in '../../../styles/pages/home/chatRoom/chatBubble.scss'

const ChatBubble = ({
  senderId,
  content,
  type,
  sentAt,
  mssgId,
  isLastMessage,
}) => {
  const currentUser = useCurrentUser();
  const currentRecipient = useCurrentRecipient();
  const {
    messageDocument,
    messageDocumentFlip,
    messagesCollection,
    messagesCollectionFlip,
    recipientDocument,
    recipientDocumentFlip,
  } = useReference();
  const alertUser = useAlertContext();
  const [showMessageMenu, setShowMessageMenu] = useState(false);

  //delete the message and update the last updated time to the last available message in the chat
  const deleteForMe = async () => {
    try {
      await deleteDoc(messageDocument(mssgId));

      if (isLastMessage) {
        const lastMssgQuery = query(
          messagesCollection(),
          orderBy('sentAt', 'desc'),
          limit(1)
        );

        const snapshot = await getDocs(lastMssgQuery);
        let lastMssgTime = 0;
        if (!snapshot.empty) {
          lastMssgTime = snapshot.docs[0].data().sentAt;
        }
        await setDoc(
          recipientDocument(),
          { lastUpdated: lastMssgTime },
          { merge: true }
        );
      }
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  // performs delete operation on the message at the recipient side as well
  const deleteForEveryone = async () => {
    try {
      await deleteDoc(messageDocumentFlip(mssgId));

      if (isLastMessage) {
        const lastMssgQuery = query(
          messagesCollectionFlip(),
          orderBy('sentAt', 'desc'),
          limit(1)
        );

        const snapshot = await getDocs(lastMssgQuery);
        let lastMssgTime = 0;
        if (!snapshot.empty) {
          lastMssgTime = snapshot.docs[0].data().sentAt;
        }
        await setDoc(
          recipientDocumentFlip(),
          { lastUpdated: lastMssgTime },
          { merge: true }
        );
      }
      deleteForMe();
    } catch (err) {
      deleteForMe();
    }
  };

  return (
    <div
      className={`chat-bubble-container ${
        senderId === currentUser.uid ? 'sender' : 'receiver'
      }`}
    >
      <div className="chat-bubble ">
        <IconAsButton
          className="message-menu-button"
          onClick={() => {
            setShowMessageMenu(prev => !prev);
          }}
        >
          {!showMessageMenu && <i className="fas fa-chevron-down" />}
          {showMessageMenu && <i className="fas fa-times" />}
        </IconAsButton>
        <div className="content">{content}</div>
        <div className="sent-at">{sentAt}</div>
        <div className={`message-menu ${showMessageMenu ? 'show' : ''}`}>
          <PrimaryButton2
            active
            slim
            className="delete-for-me"
            onClick={() => {
              deleteForMe();
            }}
          >
            {`${
              senderId === currentRecipient.uid ? 'Delete' : 'Delete For Me'
            }`}
          </PrimaryButton2>
          {senderId === currentUser.uid && (
            <PrimaryButton2
              active
              slim
              className="delete-for-everyone"
              onClick={() => {
                deleteForEveryone();
              }}
            >
              Delete For Everyone
            </PrimaryButton2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
