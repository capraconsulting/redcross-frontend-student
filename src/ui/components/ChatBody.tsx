import React, { useState } from 'react';
import IMessage from '../../interfaces/IMessage';
import '../../styles/ChatBody';

interface IProps {
  messages: IMessage[];
  send;
}

const ChatBody = (props: IProps) => {
  const [message, setMessage] = useState({
    author: 'You',
    message: '',
  } as IMessage);

  const mapMessages = () => {
    return props.messages.map((message, index) => {
      return (
        <div key={index} className={'cb--message'}>
          <p>{message}</p>
        </div>
      );
    });
  };

  const send = () => {
    if (message.message.length > 0) {
      props.send(message);
      const tmpMsg = message;
      tmpMsg.message = '';
      setMessage(tmpMsg);
    }
  };

  return (
    <div className={'cb'}>
      <div className={'cb--display'}>{mapMessages()}</div>
      <div className={'cb--input'}>
        <input className={'cb--input-text'} type="text" />
        <button onClick={() => send()} className={'cb--input-btn'}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBody;
