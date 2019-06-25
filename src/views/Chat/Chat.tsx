import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import IMessage from '../../interfaces/IMessage';
import '../../styles/Chat.less';

const Chat = () => {
  const socket = openSocket('http://localhost:8000');

  const [messages, setMessages] = useState([] as IMessage[]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
    socket.on('file', file => {
      console.log(file[0]);
    })
  }, []);

  useEffect(() => {
    const display = document.querySelector('.display');
    if (display) {
      display.scrollTo(0, display.scrollHeight);
    }
  }, [messages]);

  const send = message => {
    socket.emit('message', message, '1');
    console.log(message);
    setMessages(messages => [...messages, message]);
  };

  const sendFile = file => {
    socket.emit('file', file);
  };

  return (
    <div className={'chat'}>
      <ChatHeader connectedWith='Caroline Sandsbråten' course='Engelsk'/>
      {/*This button is temporary, only to join rooms while we dont have a proper queue*/}
      <button onClick={() => socket.emit('join room', '1')}>
        Join temporary testing room
      </button>
      <ChatBody messages={messages} send={send} sendFile={sendFile} />
    </div>
  );
};

export default Chat;
