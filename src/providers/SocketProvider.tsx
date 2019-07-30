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
import {
  addMessageAction,
  chatClosedAction,
  chatReducer,
  hasLeftChatAction,
} from '../reducers';
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
  const {
    CONNECTION,
    DISTRIBUTE_ROOM,
    TEXT,
    CONFIRMED_QUEUE,
    LEAVE_CHAT,
    CLOSE_CHAT,
  } = MESSAGE_TYPES;

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
    let action;

    console.log(msgType);

    switch (msgType) {
      case TEXT:
        dispatchMessages(addMessageAction(parsedMessage));
        break;
      case DISTRIBUTE_ROOM:
        setRoomID(payload['roomID']);
        break;
      case CONNECTION:
        setUniqueID(payload['uniqueID']);
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
