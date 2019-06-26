import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import IMessage from '../../interfaces/IMessage';
import '../../styles/Chat.less';
import {
  createEnterWaitingRoomMessage,
  createSelectFromWaitingRoomMessage,
} from '../../services/message-service';

const Chat = () => {
  // const socket = openSocket('http://localhost:3001/events');
  const [socket, setSocket] = useState(null as any);
  const [messages, setMessages] = useState([] as IMessage[]);
  const [uniqueID, setUniqueID] = useState('' as string);
  const [helpID, setHelpID] = useState('' as string);
  const [roomID, setRoomID] = useState('' as string);

  useEffect(() => {
    if (socket === null) {
      const tmpSocket = new WebSocket('ws://localhost:3001/events');
      tmpSocket.onmessage = handler;
      setSocket(tmpSocket);
    }
  });

  const handler = message => {
    const parsedMessage: IMessage = JSON.parse(message.data);
    console.log(parsedMessage);
    if (
      (parsedMessage.roomID && roomID.length < 1) ||
      (parsedMessage.roomID && roomID === 'null')
    ) {
      console.log('Set roomID: ', parsedMessage.roomID);
      setRoomID(parsedMessage.roomID);
    }

    if (parsedMessage.uniqueID && uniqueID === '') {
      console.log(parsedMessage.uniqueID);
      setUniqueID(parsedMessage.uniqueID);
    } else {
      setMessages(messages => [...messages, parsedMessage]);
    }
  };
  useEffect(() => {
    if (!socket) {
      return;
    }
    console.log('set new handler', uniqueID);
    socket.onmessage = handler;
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

  const selectFromWaitingRoom = () => {
    const message: IMessage = createSelectFromWaitingRoomMessage(helpID);
    sendEvent(message);
  };

  return (
    <div className={'chat'}>
      <ChatHeader connectedWith="Caroline Sandsbråten" course="Engelsk" />
      {/*This button is temporary, only to join rooms while we dont have a proper queue*/}

      <button onClick={() => enterWaitingRoom()}>Enter waiting room</button>
      <button onClick={() => selectFromWaitingRoom()}>
        Select from waiting room
      </button>
      <input type="text" onChange={event => setHelpID(event.target.value)} />
      <ChatBody messages={messages} send={send} />
    </div>
  );
};

export default Chat;
