import { onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ContactCard from '../../../components/ContactCard';
import { useFixedReference } from '../../../context/DbReferenceProvider';

// styles implemented in '../../../styles/pages/home/contacts/searchContacts.scss'
// loads the contacts with whom user had a conversation already

const RecentChats = () => {
  const [contacts, setContacts] = useState([]);
  const { directChatsCollection } = useFixedReference();
  useEffect(() => {
    let unsubDb = null;
    if (directChatsCollection) {
      const q = query(directChatsCollection, orderBy('lastUpdated', 'desc'));
      unsubDb = onSnapshot(q, snapshot => {
        if (!snapshot.empty) {
          const tempArr = [];
          snapshot.docs.forEach(doc => {
            tempArr.push(doc.id);
          });
          setContacts(tempArr);
        } else {
          setContacts([]);
        }
      });
    }

    return () => {
      if (unsubDb) {
        unsubDb();
      }
    };
  }, [directChatsCollection]);

  return (
    <div className="recent-chats">
      <h2>Recent Chats</h2>
      {Boolean(contacts.length) &&
        contacts.map((uid, key) => {
          return <ContactCard uid={uid} key={key} />;
        })}
      {!Boolean(contacts.length) && (
        <div className="start-chat-instructions">
          Click on the search icon to search for users and start a conversation.
        </div>
      )}
    </div>
  );
};

export default RecentChats;
