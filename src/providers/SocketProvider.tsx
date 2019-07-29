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
  hasLeftChatAction, reconnectChatAction,
} from '../reducers';
import {
  IAction,
  IPartialQueueMessage,
  IQueueMessage,
  ISocketMessage,
  ITextMessage,
} from '../interfaces';
import { ReconnectMessageBuilder } from '../services/message-service';

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
        setTalkyID(payload['talkyID']);
        break;
      case CONNECTION:
        setUniqueID(payload['uniqueID']);
        // reconnectHandler(payload['uniqueID']);
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
        // reconnectSuccessHandler(payload['roomIDs']);
        break;
    }
  };

  const reconnectSuccessHandler = (roomIDs: string): void => {
    const messagesFromSessionStorage = localStorage.getItem('messages');
    if (messagesFromSessionStorage) {
      const parsedMessagesFromSessionStorage: ITextMessage[] = JSON.parse(messagesFromSessionStorage);
      if (roomIDs.includes(parsedMessagesFromSessionStorage[0].roomID)) {
        dispatchMessages(reconnectChatAction(parsedMessagesFromSessionStorage));
        console.log('reconnected successfully');
      }
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (!sessionStorage.getItem('roomID')) {
      sessionStorage.setItem('roomID', roomID);
      console.log('roomID stored');
    }
  }, [roomID]);

  useEffect(() => {
    if (!sessionStorage.getItem('oldUniqueID')) {
      sessionStorage.setItem('oldUniqueID', uniqueID);
      console.log('old Unique ID stored');
    }
  }, [uniqueID]);

  const reconnectHandler = (uniqueID: string): void => {
    const room = sessionStorage.getItem('roomID') || '';
    const oldUniqueID = sessionStorage.getItem('oldUniqueID');
    if (oldUniqueID) {
      // Should still be able to reconenct without roomID
      const msg = new ReconnectMessageBuilder(uniqueID)
        .withOldUniqueID(oldUniqueID)
        .withRoomIDs([room])
        .build();
      socketSend(msg.createMessage);
    }
  };

  useEffect(() => {
    getSocket().onmessage = socketHandler;
  });

  const socketSend = (message: ISocketMessage): void => {
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
        talkyID
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
