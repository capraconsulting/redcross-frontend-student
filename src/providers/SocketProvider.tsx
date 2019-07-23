import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  IPartialQueueMessage,
  IQueueMessage,
  ISocketMessage,
  ITextMessage,
} from '../interfaces/IMessage';
import { CHAT_URL, MESSAGE_TYPES } from '../../config';
import { addMessageAction, chatReducer } from '../reducers';
import { IAction } from '../interfaces';

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
  const [studentInfo, setStudentInfo] = useState<IQueueMessage>({
    nickname: '' as string,
    subject: '' as string,
    grade: '' as string,
    uniqueID: '' as string,
    introText: '' as string,
    course: '' as string,
    chatType: '' as string,
  });

  const updateStudentInfo = (partial: IPartialQueueMessage) => {
    const newStudentInfo: IQueueMessage = studentInfo;
    newStudentInfo.subject = partial.subject;
    newStudentInfo.introText = partial.introText;
    newStudentInfo.grade = partial.grade;
    setStudentInfo(newStudentInfo);
  };

  const socketHandler = message => {
    const parsedMessage: ISocketMessage = JSON.parse(message.data);
    const { msgType, payload } = parsedMessage;
    const {
      CONNECTION,
      DISTRIBUTE_ROOM,
      TEXT,
      CONFIRMED_QUEUE,
    } = MESSAGE_TYPES;

    if (msgType === TEXT) {
      dispatchMessages(addMessageAction(parsedMessage));
    } else if (msgType === DISTRIBUTE_ROOM) {
      setRoomID(payload['roomID']);
    } else if (msgType === CONNECTION) {
      setUniqueID(payload['uniqueID']);
    } else if (msgType === CONFIRMED_QUEUE) {
      setStudentInfo(payload['info']);
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
      value={{
        uniqueID,
        roomID,
        messages,
        dispatchMessages,
        socketSend,
        studentInfo,
        updateStudentInfo,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
