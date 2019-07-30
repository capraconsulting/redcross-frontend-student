import React, { useEffect, useState } from 'react';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import ChatInput from './Sections/ChatInput';
import { ISocketMessage, ITextMessage } from '../../interfaces/IMessage';
import '../../styles/Chat.less';
import { QueueMessageBuilder } from '../../services/message-service';
import { CHAT_TYPES } from '../../../config';

const MestringChat = () => {
  const [socket, setSocket] = useState(null as any);
  const [messages, setMessages] = useState([] as ITextMessage[]);
  const [roomID, setRoomID] = useState('' as string);
  const [uniqueID, setUniqueID] = useState('' as string);

  const grade = 'VG1';
  const nickname = 'Mestringsboi';
  const introText = 'NERVER SOM GÅR AMOK, HJELP MEG FÅ RO I SJELA FØR EKSAMEN';
  const subject = 'Matte';
  const course = 'Norsk';

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

  const sendEnterQueueMessage = (chatType: string) => {
    const msg = new QueueMessageBuilder(uniqueID)
      .withCourse(course)
      .withGrade(grade)
      .withIntroText(introText)
      .withNickname(nickname)
      .withSubject(subject)
      .withChatType(chatType)
      .build();
    socket.send(msg.createMessage);
  };
  return (
    <div className={'chat'}>
      <ChatHeader connectedWith="Caroline Sandsbråten" subject="Mestring" />
      <button onClick={() => sendEnterQueueMessage(CHAT_TYPES.MESTRING_TEXT)}>
        Enter mestring text queue
      </button>
      <ChatBody messages={messages} />
      <ChatInput uniqueID={uniqueID} roomID={roomID} send={sendTextMessage} />
    </div>
  );
};

export default MestringChat;
