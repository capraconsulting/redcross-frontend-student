import React, { useState } from 'react';
import '../../styles/ChatBody';

interface IProps {
  messages: string[];
}

const ChatBody = (props: IProps) => {

  const mapMessages = () => {
    return props.messages.map((message, index) => {
      return (
        <div key={index} className={'cb--message'}>
          <p>{message}</p>
        </div>
      );
    });
  };

  return (
    <div className={'cb'}>
      <div className={'cb--display'}>{mapMessages()}</div>
      <div className={'cb--input'}>
        <input className={'cb--input-text'} type="text" />
        <button className={'cb--input-btn'}>Send</button>
      </div>
    </div>
  );
};

export default ChatBody;
