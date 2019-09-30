import React from 'react';
import ChatMessage from './ChatMessage';
import '../../../styles/ChatBody';
import { ITextMessage } from '../../../interfaces';

interface IProps {
  messages: ITextMessage[];
}

const ChatBody = (props: IProps) => {
  const mapMessages = () => {
    if (!props.messages) {
      return null;
    }
    return props.messages.map((message, index) => {
      return <ChatMessage key={index} message={message} />;
    });
  };

  return (
    <div className={'cb'}>
      <div className="display" id="message-display">
        <div className={'welcome-container'}>
          <p className="welcome-header">Velkommen til chaten!</p>
          <p className="welcome-body">
            Hvis du sender et vedlegg må du gjerne fjerne navnet ditt eller
            andre ting fra dokumentet som kan indentifisere deg.
          </p>
        </div>
        {mapMessages()}
        <div className="chat-end" />
      </div>
    </div>
  );
};

export default ChatBody;
