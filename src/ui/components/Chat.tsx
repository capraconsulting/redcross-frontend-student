import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { ChatBody, ChatHeader } from '.';
import IMessage from '../../interfaces/IMessage';
import '../../styles/Chat.less';

const Chat = () => {
  const socket = openSocket('http://localhost:8000');

  const [isOpen, setIsOpen] = useState(true as boolean);
  const [unreadMessages, setUnreadMessages] = useState(0 as number);
  const [messages, setMessages] = useState([] as IMessage[]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([
        ...messages,
        {
          author: message.author,
          message,
        },
      ]);
    });
  }, []);

  const send = message => {
    socket.emit('message', message);
    setMessages([
      ...messages,
      {
        author: message.author,
        message,
      },
    ]);
  };

  return (
    <div className={'chat'}>
      <ChatHeader connectedWith={'Caroline'} />
      <ChatBody messages={messages} send={send} />
    </div>
  );
};

export default Chat;
