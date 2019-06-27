import React, { useEffect, useState } from 'react';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import ChatInput from './Sections/ChatInput';
import { ISocketMessage, ITextMessage } from '../../interfaces/IMessage';
import '../../styles/Chat.less';
import { createEnterQueueMessage } from '../../services/message-service';

const Chat = () => {
  const [socket, setSocket] = useState(null as any);
  const [messages, setMessages] = useState([] as ITextMessage[]);
  const [roomID, setRoomID] = useState('' as string);
  const [uniqueID, setUniqueID] = useState('' as string);

  useEffect(() => {
    setSocket(new WebSocket('ws://localhost:3001/events'));
  }, []);

  const generateTextMessageFromPayload = (
    message: ISocketMessage,
  ): ITextMessage => {
    return {
      author: message.payload['author'],
      roomID: message.payload['roomID'],
      uniqueID: message.payload['uniqueID'],
      message: message.payload['message'],
      datetime: message.payload['datetime'],
    };
  };

  const socketHandler = message => {
    const parsedMessage: ISocketMessage = JSON.parse(message.data);

    if (parsedMessage.type === 'textMessage') {
      setMessages(messages => [
        ...messages,
        generateTextMessageFromPayload(parsedMessage),
      ]);
    } else if (parsedMessage.type === 'distributeRoomMessage') {
      setRoomID(parsedMessage.payload['roomID']);
    } else if (parsedMessage.type === 'connectionMessage') {
      setUniqueID(parsedMessage.payload['uniqueID']);
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

  const sendTextMessage = (message: ISocketMessage) => {
    socket.send(JSON.stringify(message));
    setMessages(messages => [
      ...messages,
      generateTextMessageFromPayload(message),
    ]);
  };

  const sendEnterQueueMessage = () => {
    const msg = createEnterQueueMessage(uniqueID);
    socket.send(JSON.stringify(msg));
  };
  return (
    <div className={'chat'}>
      <ChatHeader connectedWith="Caroline Sandsbråten" course="Engelsk" />
      <button onClick={() => sendEnterQueueMessage()}>Enter queue</button>
      <ChatBody messages={messages} />
      <ChatInput uniqueID={uniqueID} roomID={roomID} send={sendTextMessage} />
    </div>
  );
};

export default Chat;
