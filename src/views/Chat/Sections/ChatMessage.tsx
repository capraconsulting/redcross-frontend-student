import React from 'react';
import '../../../styles/ChatMessage.less';
import { NorwegianTime } from '../../../services/date-service';
import { ITextMessage } from '../../../interfaces/IMessage';

interface IProps {
  message: ITextMessage;
}

const ChatMessage = (props: IProps) => {
  const { author, message, datetime, uniqueID, files } = props.message;
  const authorType = author === 'student' ? 'self' : 'other';

  const downloadFile = file => {
    const a = document.createElement('a');
    a.href = String(file.fileUrl);
    a['download'] = file.fileName;
    a.click();
  };

  const RenderFiles = () => {
    return (
      typeof message === 'string' &&
      files &&
      files.length > 0 &&
      files.map((file, index) => {
        return (
          <div className={'cm'} key={index}>
            <div
              className={`cm--download cm--${authorType} cm--${authorType}--file`}
            >
              <p className={`cm--message`}>
                <span className="cm--file-name">{file.fileName} </span>
                <span className="cm--file-size">
                  {(1000000 / 1000000).toPrecision(3)} MB
                </span>
              </p>
              <img
                onClick={() => downloadFile(file)}
                className="svg-download"
                src={require('../../../assets/images/download.svg')}
                alt=""
              />
            </div>
          </div>
        );
      })
    );
  };

  const renderMessage = () => {
    return (
      message &&
      message.length > 0 && (
        <p
          className={`cm--message cm--${authorType} cm--${authorType}--message`}
        >
          {message}
        </p>
      )
    );
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
      <div>
        <div className={`cm`}>
          <p className={`cm--author-${authorType}`}>
            <span>{authorType === 'self' ? 'Deg' : author}</span>, kl.{' '}
            <span>{NorwegianTime(datetime)}</span>
          </p>
          {renderMessage()}
        </div>
        {RenderFiles()}
      </div>
    );
  }
};

export default ChatMessage;
