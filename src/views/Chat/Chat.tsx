import React, { useEffect, useState } from 'react';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import IMessage from '../../interfaces/IMessage';
import '../../styles/Chat.less';
import { createEnterWaitingRoomMessage } from '../../services/message-service';

const Chat = () => {
  const [socket, setSocket] = useState(null as any);
  const [messages, setMessages] = useState([] as IMessage[]);
  const [uniqueID, setUniqueID] = useState('' as string);
  const [roomID, setRoomID] = useState('' as string);

  useEffect(() => {
    setSocket(new WebSocket('ws://localhost:3001/events'));
  }, []);

  const socketHandler = message => {
    const parsedMessage: IMessage = JSON.parse(message.data);

    if (
      parsedMessage.message === 'lostClient' ||
      parsedMessage.message === 'newClient'
    ) {
      return;
    }
    if (parsedMessage.roomID && roomID.length <= 'null'.length) {
      setRoomID(parsedMessage.roomID);
    }
    if (parsedMessage.uniqueID && uniqueID === '') {
      setUniqueID(parsedMessage.uniqueID);
    } else {
      setMessages(messages => [...messages, parsedMessage]);
    }
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = socketHandler;
  });

  useEffect(() => {
    const display = document.querySelector('.display');
    if (display) {
      display.scrollTo(0, display.scrollHeight);
    }
  }, [messages]);

  const sendEvent = (message: IMessage) => {
    message.uniqueID = uniqueID;
    message.roomID = roomID;
    console.log(message);
    socket.send(JSON.stringify(message));
  };

  const send = (message: IMessage) => {
    sendEvent(message);
    setMessages(messages => [...messages, message]);
  };

  const enterWaitingRoom = () => {
    const message: IMessage = createEnterWaitingRoomMessage();
    sendEvent(message);
  };

  return (
    <div className={'chat'}>
      <ChatHeader connectedWith="Caroline Sandsbråten" course="Engelsk" />
      {/*This button is temporary, only to join rooms while we dont have a proper queue*/}
      <button onClick={() => enterWaitingRoom()}>Enter waiting room</button>
      <ChatBody messages={messages} send={send} />
    </div>
  );
};

export default Chat;
