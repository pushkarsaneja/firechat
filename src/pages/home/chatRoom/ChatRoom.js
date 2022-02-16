import { addDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import React, { memo, useEffect, useRef, useState } from 'react';
import { CircularButton, IconAsButton } from '../../../components/Buttons';
import DisplayPic from '../../../components/DisplayPic';
import {
  useCurrentRecipient,
  useSetCurrentRecipient,
} from '../../../context/CurrentRecipientProvider';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import {
  useCurrentSection,
  useSetCurrentSection,
} from '../../../context/CurrentSectionProvider';
import ChatBubble from './ChatBubble';
import { useAlertContext } from '../../../context/AlertProvider';
import { getReadableTime } from '../../../helper/getReadableTime';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useReference } from '../../../context/DbReferenceProvider';

// styles implemented in '../../../styles/pages/home/chatRoom/chatRoom.scss'

const ChatRoom = () => {
  const currentRecipient = useCurrentRecipient();
  const setCurrentRecipient = useSetCurrentRecipient();
  const currentUser = useCurrentUser();
  const [messages, setMessages] = useState([]); // stores the messages fetched from firestore
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const currentSection = useCurrentSection();
  const setCurrentSection = useSetCurrentSection();
  const alertUser = useAlertContext();
  const messageInputRef = useRef();
  const chatRoomBodyRef = useRef();
  const {
    messageDocument,
    messagesCollection,
    messagesCollectionFlip,
    recipientDocument,
    recipientDocumentFlip,
  } = useReference();

  // calls the scrollToBottom function to scroll the chat body to the end and updates the lastRead time
  // to lastMessage's time
  useEffect(() => {
    if (recipientDocument()) {
      scrollToBottom();

      if (messages.length > 0) {
        setDoc(
          recipientDocument(),
          {
            lastRead: messages[messages.length - 1].sentAt,
          },
          { merge: true }
        );
      } else {
        setDoc(
          recipientDocument(),
          {
            lastRead: 0,
          },
          { merge: true }
        );
      }
    }
  }, [messages, recipientDocument]);

  // gets the messages from firestore database in ascending order of sentAt time
  useEffect(() => {
    let unsubDb = null;
    if (messagesCollection()) {
      const q = query(messagesCollection(), orderBy('sentAt'));

      unsubDb = onSnapshot(q, snapshot => {
        if (snapshot.docs.length === 0) {
          setMessages([]);
        } else {
          const tempArr = [];
          snapshot.docs.forEach(doc => {
            tempArr.push({ ...doc.data(), id: doc.id });
          });
          setMessages(tempArr);
        }
      });

      return () => {
        if (unsubDb) unsubDb();
      };
    }
  }, [messagesCollection]);

  // scrolls the chatRoomBody equal to its scrollHeight
  function scrollToBottom() {
    const scrollDistance = chatRoomBodyRef.current.scrollHeight;
    chatRoomBodyRef.current.scroll(0, scrollDistance);
  }

  // gives the current time in milliseconds
  const getCurrentTime = () => {
    const d = new Date();
    return d.getTime();
  };

  // writes the message in directChats/recipient/messages of the user as well as the recipient
  // updates the lastUpdated time to the time of newMessage
  const sendMessage = async (content, sentAt, type = 'text') => {
    const newMessage = {
      content,
      type,
      sentAt,
      senderId: currentUser.uid,
    };
    try {
      if (!content) throw new Error('Please type a message first.');
      const mssg = await addDoc(messagesCollectionFlip(), newMessage);
      await setDoc(messageDocument(mssg.id), newMessage);

      await setDoc(
        recipientDocument(),
        { lastUpdated: sentAt },
        { merge: true }
      );

      await setDoc(
        recipientDocumentFlip(),
        { lastUpdated: sentAt },
        { merge: true }
      );
    } catch (err) {
      alertUser(err.message, 'error');
    }
  };

  return (
    <section
      className={`chat-room use-wallpaper ${
        currentSection === 'chat-room' ? 'expand' : ''
      }`}
    >
      {!currentRecipient && (
        <div className="select-a-chat-info">Select a chat to view messages</div>
      )}
      {currentRecipient && (
        <>
          <div className="chat-room-header">
            <DisplayPic imageUrl={currentRecipient.profilePicture} />
            <div className="recipient-info">
              <div className="recipient-name">
                {currentRecipient.firstName + ' ' + currentRecipient.lastName}
              </div>
              <div className="recipient-status">Online</div>
            </div>
            <IconAsButton
              className="back-button"
              onClick={() => {
                setCurrentSection('contacts');
                setCurrentRecipient(null);
                setShowEmojiPicker(false);
              }}
            >
              <i className="fas fa-arrow-left back" />
              <i className="fas fa-times close" />
            </IconAsButton>
          </div>
          <div className="chat-room-body" ref={chatRoomBodyRef}>
            {!Boolean(messages.length) && (
              <div className="no-messages">Enjoy chatting...</div>
            )}
            {Boolean(messages.length) &&
              messages.map((mssg, index) => (
                <ChatBubble
                  content={mssg.content}
                  sentAt={getReadableTime(mssg.sentAt)}
                  senderId={mssg.senderId}
                  mssgId={mssg.id}
                  key={mssg.id}
                  isLastMessage={index === messages.length - 1 ? true : false}
                />
              ))}
          </div>
          <div className="chat-room-footer">
            <CircularButton
              active
              className="select-emoji"
              onClick={() => {
                setShowEmojiPicker(prev => !prev);
              }}
              small
            >
              {!showEmojiPicker && <i className="far fa-smile" />}
              {showEmojiPicker && <i className="fas fa-times-circle" />}
            </CircularButton>

            <div
              className={`emoji-picker-container ${
                showEmojiPicker ? '' : 'hide'
              }`}
            >
              <Picker
                onSelect={emoji => {
                  messageInputRef.current.value =
                    messageInputRef.current.value + emoji.native;
                }}
                title="Fire Chat"
                emoji="fire"
                showPreview={false}
                theme="dark"
                color="#ffffff"
              />
            </div>

            <textarea className="message-input" ref={messageInputRef} />
            <CircularButton
              active
              className="send-message"
              onClick={() => {
                sendMessage(messageInputRef.current.value, getCurrentTime());
                messageInputRef.current.value = '';
                messageInputRef.current.focus();
                setShowEmojiPicker(false);
              }}
              small
            >
              <i className="fas fa-paper-plane" />
            </CircularButton>
          </div>
        </>
      )}
    </section>
  );
};

export default memo(ChatRoom);
