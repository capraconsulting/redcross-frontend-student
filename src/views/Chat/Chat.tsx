import React, { useEffect, useState } from 'react';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import ChatInput from './Sections/ChatInput';
import { ISocketMessage, ITextMessage } from '../../interfaces/IMessage';
import '../../styles/Chat.less';
import { EnterQueueMessageBuilder } from '../../services/message-service';

const Chat = () => {
  const [socket, setSocket] = useState(null as any);
  const [messages, setMessages] = useState([] as ITextMessage[]);
  const [roomID, setRoomID] = useState('' as string);
  const [uniqueID, setUniqueID] = useState('' as string);

  const course = 'Mattefaen';
  const nickname = 'Hænsyboi';
  const introText = 'TRENGER NO HJÆLP MED MATTA, OG DET BRENNKVIKT';
  const grade = 'VG3';
  const subject = 'Jesus take the fucking wheel';

  useEffect(() => {
    setSocket(new WebSocket('ws://localhost:3002/events'));
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

    if (parsedMessage.msgType === 'TEXT') {
      setMessages(messages => [
        ...messages,
        generateTextMessageFromPayload(parsedMessage),
      ]);
    } else if (parsedMessage.msgType === 'DISTRIBUTE_ROOM') {
      setRoomID(parsedMessage.payload['roomID']);
    } else if (parsedMessage.msgType === 'CONNECTION') {
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
    const msg = new EnterQueueMessageBuilder(uniqueID)
      .withCourse(course)
      .withGrade(grade)
      .withIntroText(introText)
      .withNickname(nickname)
      .withSubject(subject)
      .build();
    socket.send(JSON.stringify(msg.createMessage));
  };
  return (
    <div className={'chat'}>
      <ChatHeader connectedWith="Caroline Sandsbråten" subject="Engelsk" />
      <button onClick={() => sendEnterQueueMessage()}>Enter queue</button>
      <ChatBody messages={messages} />
      <ChatInput uniqueID={uniqueID} roomID={roomID} send={sendTextMessage} />
    </div>
  );
};

export default Chat;
