import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ISocketMessage, ITextMessage } from '../interfaces/IMessage';
import { CHAT_URL } from '../../config';
import { addMessageAction, chatReducer } from '../reducers';
import { IAction } from '../interfaces';

export const SocketContext = createContext({
  uniqueID: '' as string,
  roomID: '' as string,
  messages: [] as ITextMessage[],
  dispatchMessages(action: IAction) {},
  socketSend(message: ISocketMessage): void {},
});

let socket;

const getSocket = (): WebSocket => {
  if (!socket) {
    socket = new WebSocket(CHAT_URL);
  }
  return socket;
};

export const SocketProvider: FunctionComponent = ({ children }: any) => {
  const [uniqueID, setUniqueID] = useState<string>('');
  const [roomID, setRoomID] = useState<string>('');
  const [messages, dispatchMessages] = useReducer(chatReducer, []);

  const socketHandler = message => {
    const parsedMessage: ISocketMessage = JSON.parse(message.data);
    if (parsedMessage.msgType === 'TEXT') {
      dispatchMessages(addMessageAction(parsedMessage));
    } else if (parsedMessage.msgType === 'DISTRIBUTE_ROOM') {
      setRoomID(parsedMessage.payload['roomID']);
    } else if (parsedMessage.msgType === 'CONNECTION') {
      setUniqueID(parsedMessage.payload['uniqueID']);
    }
  };

  useEffect(() => {
    getSocket().onmessage = socketHandler;
  });

  const socketSend = (message: ISocketMessage) => {
    getSocket().send(JSON.stringify(message));
  };

  return (
    <SocketContext.Provider
      value={{ uniqueID, roomID, messages, dispatchMessages, socketSend }}
    >
      {children}
    </SocketContext.Provider>
  );
};
