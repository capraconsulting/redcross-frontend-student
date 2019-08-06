import React, { useContext, useEffect } from 'react';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import ChatInput from './Sections/ChatInput';
import { ISocketMessage } from '../../interfaces/ISocketMessage';
import '../../styles/Chat.less';
import { QueueMessageBuilder } from '../../services/message-service';
import { SocketContext } from '../../providers';
import { addMessageAction } from '../../reducers';

const Chat = () => {
  const {
    uniqueID,
    socketSend,
    dispatchMessages,
    messages,
    roomID,
  } = useContext(SocketContext);

  useEffect(() => {
    const display = document.querySelector('.display');
    if (display) {
      display.scrollTo(0, display.scrollHeight);
    }
  }, [messages]);

<<<<<<< HEAD

=======
>>>>>>> b8ebda5a0461cecfd1b455a468fbf1713dd66056
  return (
    <div className={'chat'}>
      <ChatHeader connectedWith="Caroline Sandsbråten" subject="Engelsk" />
      <ChatBody messages={messages} />
      <ChatInput uniqueID={uniqueID} roomID={roomID} />
    </div>
  );
};

export default Chat;
