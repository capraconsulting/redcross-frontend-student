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
  cleanChatAction,
  cleanStudentInfoAction,
  hasLeftChatAction,
  initStudentInfoAction,
  queueInfoReducer,
  reconnectChatAction,
} from '../reducers';
import {
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
  dispatchMessages(action: IAction): void {},
  socketSend(message: ISocketMessage): void {},
  talkyID: '' as string,
  imgUrl: '' as string,
  cleanState(): void {},

  dispatchStudentInfo(action: IAction): void {},
  studentInfo: {} as IQueueMessage,
  inQueue: false as boolean,
});

let socket;

const getSocket = (): WebSocket => {
  if (!socket) {
    socket = new WebSocket(CHAT_URL);
  }
  return socket;
};

export const SocketProvider: FunctionComponent = ({ children }: any) => {
  const [inQueue, setInQueue] = useState<boolean>(false);
  const [uniqueID, setUniqueID] = useState<string>('');
  const [roomID, setRoomID] = useState<string>('');
  const [messages, dispatchMessages] = useReducer(chatReducer, []);
  const [talkyID, setTalkyID] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [studentInfo, dispatchStudentInfo] = useReducer(
    queueInfoReducer,
    {} as IQueueMessage,
  );
  const {
    CONNECTION,
    DISTRIBUTE_ROOM,
    TEXT,
    LEAVE_CHAT,
    CLOSE_CHAT,
    RECONNECT,
    UPDATE_QUEUE,
    CONFIRMED_QUEUE,
  } = MESSAGE_TYPES;

  const socketSend = (message: ISocketMessage): void => {
    getSocket().send(JSON.stringify(message));
  };

  const cleanState = (): void => {
    // Clean sessionStorage
    sessionStorage.clear();

    // Clean state
    dispatchMessages(cleanChatAction());
    dispatchStudentInfo(cleanStudentInfoAction());

    setTalkyID('');
    setRoomID('');
    setUniqueID('');
    setInQueue(false);

    // clean socket
    socket = null;
    getSocket().onmessage = socketHandler;
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
    const studentInfoFromSessionStorage = sessionStorage.getItem('studentInfo');

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
      if (messagesFromSessionStorage) {
        const parsedMessagesFromSessionStorage: ITextMessage[] = JSON.parse(
          messagesFromSessionStorage,
        );
        dispatchMessages(reconnectChatAction(parsedMessagesFromSessionStorage));
      }
    } else {
      sessionStorage.removeItem('messages');
      sessionStorage.removeItem('roomID');
    }

    if (studentInfoFromSessionStorage) {
      const parsedStudentInfoFromSessionStorage: IQueueMessage = JSON.parse(
        studentInfoFromSessionStorage,
      );
      dispatchStudentInfo(
        initStudentInfoAction(parsedStudentInfoFromSessionStorage),
      );
      setInQueue(true);
    }
  };

  const socketHandler = message => {
    const parsedMessage: ISocketMessage = JSON.parse(message.data);
    const { msgType, payload } = parsedMessage;
    let action;

    switch (msgType) {
      case TEXT:
        setImgUrl(payload['imgUrl']);
        dispatchMessages(addMessageAction(parsedMessage));
        console.log(parsedMessage);
        break;
      case DISTRIBUTE_ROOM:
        setRoomID(payload['roomID']);
        setTalkyID(payload['talkyID']);
        break;
      case CONNECTION:
        reconnectHandler(payload['uniqueID']);
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
      case UPDATE_QUEUE:
        dispatchStudentInfo(initStudentInfoAction(payload['info']));
        break;
      case CONFIRMED_QUEUE:
        setInQueue(true);
        dispatchStudentInfo(initStudentInfoAction(payload['info']));
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
    if (studentInfo.subject && studentInfo.subject.length > 0) {
      sessionStorage.setItem('studentInfo', JSON.stringify(studentInfo));
    }
  }, [studentInfo]);

  useEffect(() => {
    getSocket().onmessage = socketHandler;
  }, []);

  return (
    <SocketContext.Provider
      value={{
        uniqueID,
        roomID,
        messages,
        dispatchMessages,
        socketSend,
        studentInfo,
        dispatchStudentInfo,
        talkyID,
        imgUrl,
        inQueue,
        cleanState,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
