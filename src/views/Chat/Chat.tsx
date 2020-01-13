import React, { useContext, useEffect } from 'react';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import ChatInput from './Sections/ChatInput';
import '../../styles/Chat.less';
import { SocketContext } from '../../providers';

const Chat = () => {
  const { uniqueID, messages, roomID, studentInfo } = useContext(SocketContext);

  useEffect(() => {
    const display = document.querySelector('.chat-body');
    if (display) {
      display.scrollTo(0, display.scrollHeight);
    }
  }, [messages]);

  return (
    <div className="chat">
      <ChatHeader
        connectedWith={studentInfo.volName}
        subject={studentInfo.subject}
      />
      <ChatBody messages={messages} />
      <ChatInput uniqueID={uniqueID} roomID={roomID} />
    </div>
  );
};

export default Chat;
