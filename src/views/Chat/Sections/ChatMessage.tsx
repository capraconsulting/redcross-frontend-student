import React from 'react';
import '../../../styles/ChatMessage.less';
import { NorwegianTime } from '../../../services/date-service';
import { ITextMessage } from '../../../interfaces';

interface IProps {
  message: ITextMessage;
}

const ChatMessage = (props: IProps) => {
  const { author, message, datetime, uniqueID } = props.message;
  const authorType = author === 'student' ? 'self' : 'other';

  const renderMessage = () => {
    return <p className={`cm--message cm--${authorType}`}>{message}</p>;
  };

  if (uniqueID === 'NOTIFICATION') {
    return (
      <div className="cm">
        <div className="cm--notification">
          <p className="cm--notification--body">
            <span className="author-name">{author}</span>
            {'\n'} {message}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`cm`}>
        <p className={`cm--author-${authorType}`}>
          <span>{authorType === 'self' ? 'Deg' : author}</span>, kl.{' '}
          <span>{NorwegianTime(datetime)}</span>
        </p>
        {renderMessage()}
      </div>
    );
  }
};

export default ChatMessage;
