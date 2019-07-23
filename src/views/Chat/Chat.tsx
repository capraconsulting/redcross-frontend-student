import React, { useContext, useEffect, useState } from 'react';
import ChatBody from './Sections/ChatBody';
import ChatHeader from './Sections/ChatHeader';
import ChatInput from './Sections/ChatInput';
import { ISocketMessage, ITextMessage } from '../../interfaces/IMessage';
import '../../styles/Chat.less';
import { EnterQueueMessageBuilder } from '../../services/message-service';
import { SocketContext } from '../../providers';
import { addMessageAction } from '../../reducers';

const Chat = () => {

  const {uniqueID, socketSend, dispatchMessages, messages, roomID} = useContext(SocketContext);

  const course = 'Mattefaen';
  const nickname = 'Hænsyboi';
  const introText = 'TRENGER NO HJÆLP MED MATTA, OG DET BRENNKVIKT';
  const grade = 'VG3';
  const subject = 'Jesus take the fucking wheel';



  useEffect(() => {
    const display = document.querySelector('.display');
    if (display) {
      display.scrollTo(0, display.scrollHeight);
    }
  }, [messages]);

  const sendTextMessage = (message: ISocketMessage) => {
    dispatchMessages(addMessageAction(message));
    socketSend(message);
  };

  const sendEnterQueueMessage = () => {
    const msg = new EnterQueueMessageBuilder(uniqueID)
      .withCourse(course)
      .withGrade(grade)
      .withIntroText(introText)
      .withNickname(nickname)
      .withSubject(subject)
      .build();
    socketSend(msg.createMessage);
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
