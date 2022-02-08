import React, { useEffect, useState } from 'react';
import {
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import DisplayPic from './DisplayPic';
import {
  useCurrentRecipient,
  useSetCurrentRecipient,
} from '../context/CurrentRecipientProvider';
import { useSetCurrentSection } from '../context/CurrentSectionProvider';
import { useCurrentUser } from '../context/CurrentUserProvider';
import { getReadableTime } from '../helper/getReadableTime';
import { CloseButton, PrimaryButton1 } from './Buttons';
import { useAlertContext } from '../context/AlertProvider';
import { capitalizeFirst } from '../helper/capitalizeFirst';
import {
  useFixedReference,
  useReference,
} from '../context/DbReferenceProvider';

// styles implemented in '../styles/components/contactCard.scss'

// if disableDeleteChat is true, right click menu to delete chats is disabled
// if disableLastReadUpdate is true, lastRead time is not updated on clicking the card
const ContactCard = ({ uid, disableDeleteChat, disableLastReadUpdate }) => {
  const [userData, setuserData] = useState(null); //stores the data of the user to be displayed in the card (not current user)
  const [lastMessage, setLastMessage] = useState(null); //stores the last message sent in the chat
  const [showMenu, setShowMenu] = useState(false); // conditionally render delete chat menu on right click
  const [lastTimes, setLastTimes] = useState(null); // stores lastRead and lastUpdated time
  const setCurrentSection = useSetCurrentSection();
  const currentUser = useCurrentUser();
  const currentRecipient = useCurrentRecipient();
  const setCurrentRecipientId = useSetCurrentRecipient();
  const fixedReference = useFixedReference();
  const reference = useReference();
  const alertUser = useAlertContext();

  const messagesCollection = reference.messagesCollection;
  const recipientDocument = reference.recipientDocument;
  const messageDocument = reference.messageDocument;

  // useEffect finds the last message in the chats with the contact and sets it in a state variable,
  // gets the lastRead time and lastUpdated time
  useEffect(() => {
    let unsubDb = null;
    let unsubLastTimes = null;
    if (messagesCollection(uid)) {
      const lastMssgQuery = query(
        messagesCollection(uid),
        orderBy('sentAt', 'desc'),
        limit(1)
      );

      //listens to new message (lastMessage)
      unsubDb = onSnapshot(lastMssgQuery, snapshot => {
        if (!snapshot.empty) {
          setLastMessage(snapshot.docs[0].data());
        } else {
          setLastMessage(null);
        }
      });

      //listens to lastUpdated and lastRead time
      unsubLastTimes = onSnapshot(recipientDocument(uid), snapshot => {
        if (snapshot.exists()) {
          const lastRead = snapshot.data().lastRead
            ? snapshot.data().lastRead
            : 0;
          setLastTimes({
            lastRead: lastRead,
            lastUpdated: snapshot.data().lastUpdated,
          });
        } else {
          setLastTimes(null);
        }
      });
    }

    return () => {
      if (unsubDb) unsubDb();
      if (unsubLastTimes) unsubLastTimes();
    };
  }, [currentUser, uid, messagesCollection, recipientDocument]);

  // this useEffect gets the details of the user to be displayed in the card
  useEffect(() => {
    const unsubDb = onSnapshot(fixedReference.userDocument(uid), snapshot => {
      const data = snapshot.data();
      setuserData({
        firstName: capitalizeFirst(data.firstName),
        lastName: capitalizeFirst(data.lastName),
        username: data.username,
        profilePicture: data.profilePicture,
      });
    });

    return () => {
      unsubDb();
    };
  }, [uid, fixedReference]);

  //delete all messages promise
  const deleteMessagesPromise = snapshot => {
    return new Promise((resolve, reject) => {
      snapshot.docs.forEach(document => {
        deleteDoc(messageDocument(document.id, uid)).catch(err => {
          reject(err);
        });
      });
      resolve();
    });
  };

  //delete entire chat
  const deleteChat = async () => {
    try {
      const snapshot = await getDocs(messagesCollection(uid));

      if (!snapshot.empty) {
        await deleteMessagesPromise(snapshot);
      }

      await deleteDoc(recipientDocument(uid));
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  //update lastRead time
  const updateLastRead = () => {
    const d = new Date();
    setDoc(
      recipientDocument(uid),
      {
        lastRead: d.getTime(),
      },
      { merge: true }
    );
  };
  return (
    userData && (
      <div
        className={`contact-card ${
          currentRecipient ? (currentRecipient.uid === uid ? 'active' : '') : ''
        }`}
        onClick={() => {
          if (!showMenu) {
            setCurrentRecipientId(uid);
            setCurrentSection('chat-room');
            if (!disableLastReadUpdate) updateLastRead();
          } else {
            setShowMenu(false);
          }
        }}
        onContextMenu={e => {
          e.preventDefault();
          if (!disableDeleteChat) setShowMenu(true);
        }}
      >
        {lastTimes && lastTimes.lastRead < lastTimes.lastUpdated && (
          <div className="notification-badge" />
        )}
        <div className="dp-container">
          <DisplayPic imageUrl={userData.profilePicture} />
        </div>
        <div className="contact-info">
          <div className="contact-name">
            <span>{userData.firstName + ' ' + userData.lastName}</span>
            <span className="last-mssg-time">
              {getReadableTime(lastMessage ? lastMessage.sentAt : '')}
            </span>
          </div>
          <div className="contact-username">@{userData.username}</div>
          <div className="last-message">
            {lastMessage
              ? `${
                  lastMessage.senderId === currentUser.uid
                    ? 'You:'
                    : `${userData.firstName}:`
                } ${lastMessage.content}`
              : ''}
          </div>
        </div>
        <div className={`right-click-menu ${showMenu ? 'show' : ''}`}>
          <CloseButton
            className="close-menu"
            onClick={() => {
              setShowMenu(false);
            }}
          />
          <PrimaryButton1
            active
            className="delete-chat"
            onClick={() => {
              deleteChat();
            }}
          >
            Delete Chat
          </PrimaryButton1>
        </div>
      </div>
    )
  );
};

export default ContactCard;
