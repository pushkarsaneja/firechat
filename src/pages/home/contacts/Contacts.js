import React, { useRef, useState } from 'react';
import { IconAsButton } from '../../../components/Buttons';
import DisplayPic from '../../../components/DisplayPic';
import { BasicInput } from '../../../components/InputFields';
import { useCurrentUser } from '../../../context/CurrentUserProvider';
import { useCurrentSection } from '../../../context/CurrentSectionProvider';
import SearchContacts from './SearchContacts';
import RecentChats from './RecentChats';

// styles implemented in '../../../styles/pages/home/contacts/contacts.scss'

const Contacts = ({ setIsModalOpen }) => {
  const currentUser = useCurrentUser();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const currentSection = useCurrentSection();
  const searchBarRef = useRef();

  return (
    <section
      className={`contacts ${currentSection === 'contacts' ? 'expand' : ''}`}
    >
      <div className="contacts-header">
        <div className={`current-user ${!showSearchBar ? 'expand' : 'shrink'}`}>
          <DisplayPic
            imageUrl={currentUser.profilePicture}
            onClick={() => {
              setIsModalOpen(prev => !prev);
            }}
          />
          <span>{currentUser.firstName + ' ' + currentUser.lastName}</span>
        </div>
        <BasicInput
          placeholder="search username"
          className={`search-bar ${!showSearchBar ? 'hide' : ''}`}
          ref={searchBarRef}
          onChange={e => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
        />

        <IconAsButton
          onClick={() => {
            setShowSearchBar(prev => !prev);
            searchBarRef.current.focus();
            setSearchInput('');
          }}
        >
          {!showSearchBar && <i className="fas fa-search" />}
          {showSearchBar && <i className="fas fa-times" />}
        </IconAsButton>
      </div>
      {showSearchBar && <SearchContacts input={searchInput} />}
      {!showSearchBar && <RecentChats />}
    </section>
  );
};

export default Contacts;
