import React, { useState, useEffect } from 'react';
import '../../styles/ChatHeader';

interface IProps {
  connectedWith: string;
}

const ChatHeader = (props: IProps) => {
  const [unreadMessages, setUnreadMessages] = useState(0 as number);
  const [isOpen, setIsOpen] = useState(false as boolean);

  return (
    <div className={`ch`}>
      <span className={'ch--left'}>{props.connectedWith}</span>
      <span className={'ch--right'}>{unreadMessages}</span>
    </div>
  );
};


export default ChatHeader;
