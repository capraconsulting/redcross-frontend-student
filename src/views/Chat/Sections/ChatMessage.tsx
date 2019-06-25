import React from 'react';
import IMessage from '../../../interfaces/IMessage';
import '../../../styles/ChatMessage.less';
import { NorwegianDate, NorwegianTime } from '../../../services/date-service';

interface IProps {
  message: IMessage;
}

const ChatMessage = (props: IProps) => {
  const authorType =
    props.message.author.toLowerCase() === 'student' ? 'self' : 'other';
  return (
    <div className={`cm`}>
      <p className={`cm--author-${authorType}`}>
        <span>{authorType === 'self' ? 'Deg' : props.message.author}</span>
        , kl. <span>{NorwegianTime(props.message.datetime)}</span>
      </p>
      <p className={`cm--message cm--${authorType}`}>{props.message.message}</p>
    </div>
  );
};

export default ChatMessage;
