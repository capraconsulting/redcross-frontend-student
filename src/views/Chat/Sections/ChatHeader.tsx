import React from 'react';
import '../../../styles/ChatHeader';

interface IProps {
  connectedWith: string;
  subject: string;
}

const ChatHeader = (props: IProps) => {
  return (
    <div className="chat-header">
      <p>{props.connectedWith}</p>
      <p>{props.subject}</p>
    </div>
  );
};

export default ChatHeader;
