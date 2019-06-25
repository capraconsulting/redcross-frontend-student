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

  const downloadFile = file => {
    const blob: Blob = file;
    const name: string = blob['name'];
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a['download'] = name;
    a.click();
  };

  const renderMessage = () => {
    if (typeof props.message.message === 'string') {
      return (
        <p className={`cm--message cm--${authorType}`}>
          {props.message.message}
        </p>
      );
    } else {
      return (
        <div className={`cm--${authorType} cm--download`} onClick={() => downloadFile(props.message.message[0])}>
          <p
            className={`cm--message`}
          >
            <span className='cm--file-name'>{props.message.message[0].name} {' | '}</span>
            <span className='cm--file-size'>{(props.message.message[0].size / 1000000).toPrecision(3)} MB</span>
          </p>
            <img
              className="svg-download"
              src={require('../../../assets/images/download.svg')}
              alt=""
            />
        </div>
      );
    }
  };
  return (
    <div className={`cm`}>
      <p className={`cm--author-${authorType}`}>
        <span>{authorType === 'self' ? 'Deg' : props.message.author}</span>, kl.{' '}
        <span>{NorwegianTime(props.message.datetime)}</span>
      </p>
      {renderMessage()}
    </div>
  );
};

export default ChatMessage;
