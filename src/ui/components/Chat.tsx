import React from 'react';

import { ChatBody, ChatHeader } from '../../ui/components';

const Chat = () => {
  return (
    <div>
      <ChatHeader connectedWith={'Caroline'} />
      <ChatBody />
    </div>
  );
};

export default Chat;
