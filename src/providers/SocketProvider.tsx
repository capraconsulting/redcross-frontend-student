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
  setFrivilligNameAction,
} from '../reducers';
import {
  IQueueMessage,
  ISocketMessage,
  ITextMessage,
  IAction,
} from '../interfaces';

import {
  createLeaveMessage,
  createReconnectMessage,
} from '../services/message-service';
import { toast } from 'react-toastify';

toast.configure({
  autoClose: 1500,
  draggable: false,
  position: 'top-center',
  closeButton: false,
  closeOnClick: true,
});

export const SocketContext = createContext({
  uniqueID: '',
  roomID: '',
  messages: [] as ITextMessage[],
  dispatchMessages(action: IAction) {},
  socketSend(message: ISocketMessage) {},
  talkyID: '',
  imgUrl: '',
  cleanState() {},
  dispatchStudentInfo(action: IAction) {},
  studentInfo: {} as IQueueMessage,
  inQueue: false,
});

let socket;
const getSocket = (): WebSocket => {
  if (!socket) {
    socket = new WebSocket(CHAT_URL);
  }
  return socket;
};

const useSessionStorageBinding = (key: string, value: string) => {
  useEffect(() => {
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, value);
    }
  }, [value]);
};

export const SocketProvider: FunctionComponent = ({ children }) => {
  const [inQueue, setInQueue] = useState(false);
  const [uniqueID, setUniqueID] = useState('');
  const [roomID, setRoomID] = useState('');
  const [messages, dispatchMessages] = useReducer(chatReducer, []);
  const [talkyID, setTalkyID] = useState('');
  const [imgUrl, setImgUrl] = useState('');
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
    }
  };

  const socketHandler = message => {
    const parsedMessage: ISocketMessage = JSON.parse(message.data);
    const { msgType, payload } = parsedMessage;
    console.log(parsedMessage);
    switch (msgType) {
      case TEXT:
        setImgUrl(payload['imgUrl']);
        dispatchMessages(addMessageAction(parsedMessage));
        console.log(parsedMessage);
        break;
      case DISTRIBUTE_ROOM:
        setRoomID(payload['roomID']);
        dispatchStudentInfo(setFrivilligNameAction(payload['volName']));
        setTalkyID(payload['talkyID']);
        break;
      case CONNECTION:
        reconnectHandler(payload['uniqueID']);
        break;
      case LEAVE_CHAT:
        dispatchMessages(hasLeftChatAction(payload['name']));
        break;
      case CLOSE_CHAT:
        dispatchMessages(chatClosedAction());
        break;
      case RECONNECT:
        reconnectSuccessHandler(payload['roomIDs']);
        break;
      case UPDATE_QUEUE:
        dispatchStudentInfo(initStudentInfoAction(payload['info']));
        toast.success('Informasjonen din ble oppdatert');
        break;
      case CONFIRMED_QUEUE:
        setInQueue(true);
        dispatchStudentInfo(initStudentInfoAction(payload['info']));
        break;
    }
  };

  const cleanState = (): void => {
    // Clean sessionStorage
    sessionStorage.clear();

    // Clean state
    dispatchMessages(cleanChatAction());
    dispatchStudentInfo(cleanStudentInfoAction());

    socketSend(
      createLeaveMessage(uniqueID, roomID, studentInfo.nickname, 'student'),
    );
    setTalkyID('');
    setRoomID('');
    setUniqueID('');
    setInQueue(false);

    // clean socket
    socket = null;
    getSocket().onmessage = socketHandler;
  };

  useSessionStorageBinding('roomID', roomID);

  useSessionStorageBinding('talkyID', talkyID);

  useSessionStorageBinding('oldUniqueID', uniqueID);

  useEffect(() => {
    if (messages && messages.length > 0) {
      sessionStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

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
