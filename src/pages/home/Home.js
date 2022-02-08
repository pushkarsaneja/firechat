import React, { useState } from 'react';
import Body from '../../components/Body';
import EditProfileModal from './EditProfileModal';
import Header from '../../components/Header';
import ChatRoom from './chatRoom/ChatRoom';
import Contacts from './contacts/Contacts';

// styles implemented in '../../styles/pages/home/home.scss'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Body fixed className="home-page">
      <Header />
      <div className="main-container">
        <Contacts setIsModalOpen={setIsModalOpen} />
        <ChatRoom />
        {isModalOpen && <EditProfileModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </Body>
  );
};

export default Home;
