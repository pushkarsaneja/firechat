import React, { useEffect, useState, useCallback } from 'react';
import ContactCard from '../../../components/ContactCard';
import { getDocs, query, where } from 'firebase/firestore';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import { useFixedReference } from '../../../context/DbReferenceProvider';

// styles implemented in '../../../styles/pages/home/contacts/searchContacts.scss'

const SearchContacts = ({ input }) => {
  const [searchResult, setSearchResult] = useState([]);
  const uid = useCurrentUser().uid;
  const { usersCollection } = useFixedReference();
  const getSearchResult = useCallback(async () => {
    if (input) {
      const getByUsername = query(
        usersCollection,
        where(
          'username',
          '==',
          input
            .slice(
              0,
              input.indexOf(' ') !== -1 ? input.indexOf(' ') : input.length
            )
            .toLowerCase()
        )
      );

      const getByFirstName = query(
        usersCollection,
        where(
          'firstName',
          '==',
          input
            .slice(
              0,
              input.indexOf(' ') !== -1 ? input.indexOf(' ') : input.length
            )
            .toLowerCase()
        )
      );
      const lastNameString = input
        .slice(
          input.indexOf(' ') !== -1 ? input.indexOf(' ') + 1 : 0,
          input.length
        )
        .toLowerCase();
      const getByLastName = query(
        usersCollection,
        where('lastName', '==', lastNameString)
      );
      try {
        const tempArr = [];
        const getQueryResult = async myQuery => {
          const snapshot = await getDocs(myQuery);
          snapshot.docs.forEach(doc => {
            if (!tempArr.includes(doc.id) && doc.id !== uid)
              tempArr.push(doc.id);
          });
        };
        await getQueryResult(getByUsername);
        await getQueryResult(getByFirstName);
        // prevent search if lastNameString has no length
        if (lastNameString.length) await getQueryResult(getByLastName);

        setSearchResult(tempArr);
      } catch (err) {}
    }
  }, [input, uid, usersCollection]);

  useEffect(() => {
    getSearchResult();
  }, [getSearchResult]);

  return (
    <div className="searched-contacts-container">
      {!Boolean(searchResult.length) && (
        <div className="search-instructions">
          Please enter complete username, first name, last name, or full name.
        </div>
      )}
      {Boolean(searchResult.length) &&
        searchResult.map(uid => {
          return (
            <ContactCard
              uid={uid}
              key={uid}
              disableDeleteChat
              disableLastReadUpdate
            />
          );
        })}
    </div>
  );
};

export default SearchContacts;
