import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { CHAT_URL, MESSAGE_TYPES } from '../../config';
import {
  addMessageAction,
  chatClosedAction,
  chatReducer,
  hasLeftChatAction,
  reconnectChatAction,
} from '../reducers';
import {
  IPartialQueueMessage,
  IQueueMessage,
  ISocketMessage,
  ITextMessage,
  IAction,
} from '../interfaces';

import { createReconnectMessage } from '../services/message-service';

export const SocketContext = createContext({
  uniqueID: '' as string,
  roomID: '' as string,
  messages: [] as ITextMessage[],
  dispatchMessages(action: IAction) {},
  socketSend(message: ISocketMessage): void {},
  studentInfo: {
    // IQueueMessage
    nickname: '' as string,
    subject: '' as string,
    grade: '' as string,
    uniqueID: '' as string,
    introText: '' as string,
    course: '' as string,
    chatType: '' as string,
  },
  updateStudentInfo(partial: IPartialQueueMessage): void {},
  talkyID: '' as string,
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
  const [talkyID, setTalkyID] = useState<string>('');
  const [studentInfo, setStudentInfo] = useState<IQueueMessage>({
    nickname: '' as string,
    subject: '' as string,
    grade: '' as string,
    uniqueID: '' as string,
    introText: '' as string,
    course: '' as string,
    chatType: '' as string,
  });
  const {
    CONNECTION,
    DISTRIBUTE_ROOM,
    TEXT,
    CONFIRMED_QUEUE,
    LEAVE_CHAT,
    CLOSE_CHAT,
    RECONNECT,
  } = MESSAGE_TYPES;

  const socketSend = (message: ISocketMessage): void => {
    getSocket().send(JSON.stringify(message));
  };

  const updateStudentInfo = (partial: IPartialQueueMessage) => {
    const newStudentInfo: IQueueMessage = studentInfo;
    newStudentInfo.subject = partial.subject;
    newStudentInfo.introText = partial.introText;
    newStudentInfo.grade = partial.grade;
    setStudentInfo(newStudentInfo);
  };

  const reconnectHandler = (uniqueID: string): void => {
    const oldUniqueID = sessionStorage.getItem('oldUniqueID');

    if (oldUniqueID) {
      setUniqueID(oldUniqueID);
      const msg = createReconnectMessage(oldUniqueID);
      socketSend(msg);
    } else {
      setUniqueID(uniqueID);
    }
  };

  const reconnectSuccessHandler = (roomIDs: string[]): void => {
    const messagesFromSessionStorage = sessionStorage.getItem('messages');
    const roomIDFromSessionStorage = sessionStorage.getItem('roomID');
    const talkyIDFromSessionStorage = sessionStorage.getItem('talkyID');

    if (
      talkyIDFromSessionStorage &&
      talkyIDFromSessionStorage !== 'undefined'
    ) {
      setTalkyID(talkyIDFromSessionStorage);
    }

    if (
      roomIDFromSessionStorage &&
      roomIDs.includes(roomIDFromSessionStorage)
    ) {
      setRoomID(roomIDFromSessionStorage);
    } else {
      sessionStorage.removeItem('messages');
      sessionStorage.removeItem('roomID');
      return;
    }

    if (messagesFromSessionStorage) {
      const parsedMessagesFromSessionStorage: ITextMessage[] = JSON.parse(
        messagesFromSessionStorage,
      );
      dispatchMessages(reconnectChatAction(parsedMessagesFromSessionStorage));
    }
  };

  const socketHandler = message => {
    const parsedMessage: ISocketMessage = JSON.parse(message.data);
    const { msgType, payload } = parsedMessage;
    let action;

    switch (msgType) {
      case TEXT:
        console.log('got here');
        dispatchMessages(addMessageAction(parsedMessage));
        break;
      case DISTRIBUTE_ROOM:
        setRoomID(payload['roomID']);
        setTalkyID(payload['talkyID']);
        break;
      case CONNECTION:
        reconnectHandler(payload['uniqueID']);
        break;
      case CONFIRMED_QUEUE:
        setStudentInfo(payload['info']);
        break;
      case LEAVE_CHAT:
        action = hasLeftChatAction(payload['name']);
        dispatchMessages(action);
        break;
      case CLOSE_CHAT:
        action = chatClosedAction();
        dispatchMessages(action);
        break;
      case RECONNECT:
        reconnectSuccessHandler(payload['roomIDs']);
        break;
    }
  };
  useEffect(() => {
    if (messages && messages.length > 0) {
      sessionStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);
  useEffect(() => {
    if (!sessionStorage.getItem('roomID')) {
      sessionStorage.setItem('roomID', roomID);
    }
  }, [roomID]);

  useEffect(() => {
    const talkyIDFromSessionStorage = sessionStorage.getItem('talkyID');
    if (!talkyIDFromSessionStorage) {
      sessionStorage.setItem('talkyID', talkyID);
    }
  }, [talkyID]);

  useEffect(() => {
    const oldUniqueIDFromSessionStorage = sessionStorage.getItem('oldUniqueID');
    if (!oldUniqueIDFromSessionStorage) {
      sessionStorage.setItem('oldUniqueID', uniqueID);
    }
  }, [uniqueID]);

  useEffect(() => {
    getSocket().onmessage = socketHandler;
  });

  return (
    <SocketContext.Provider
      value={{
        uniqueID,
        roomID,
        messages,
        dispatchMessages,
        socketSend,
        studentInfo,
        updateStudentInfo,
        talkyID,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
