import React, { useState, useEffect } from 'react';

interface IProps {
  connectedWith: string;
}

const ChatHeader = (props: IProps) => {
  const [unreadMessages, setUnreadMessages] = useState(0 as number);
  const [isOpen, setIsOpen] = useState(false as boolean);

  return (
    <div className={`ch--container`}>
      <span className={'ch--item'}>{props.connectedWith}</span>
      <span className={'ch--item'}>{unreadMessages}</span>
    </div>
  );
};


export default ChatHeader;
