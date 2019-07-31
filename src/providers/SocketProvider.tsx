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
    const room = sessionStorage.getItem('roomID');
    const oldUniqueID = sessionStorage.getItem('oldUniqueID');
    if (oldUniqueID) {
      // Should still be able to reconenct without roomID
      let msg;
      if (room) {
        msg = new ReconnectMessageBuilder(uniqueID)
          .withOldUniqueID(oldUniqueID)
          .withRoomIDs([room])
          .build();
      } else {
        msg = new ReconnectMessageBuilder(uniqueID)
          .withOldUniqueID(oldUniqueID)
          .build();
      }
      socketSend(msg.createMessage);
    }
  };

  const reconnectSuccessHandler = (): void => {
    const messagesFromSessionStorage = sessionStorage.getItem('messages');
    const roomIDFromSessionStorage = sessionStorage.getItem('roomID');

    if (roomIDFromSessionStorage) {
      setRoomID(roomIDFromSessionStorage);
    }

    if (messagesFromSessionStorage) {
      const parsedMessagesFromSessionStorage: ITextMessage[] = JSON.parse(
        messagesFromSessionStorage,
      );
      dispatchMessages(reconnectChatAction(parsedMessagesFromSessionStorage));
      console.log('reconnected successfully');
    }
  };

  const socketHandler = message => {
    const parsedMessage: ISocketMessage = JSON.parse(message.data);
    const { msgType, payload } = parsedMessage;
    let action;

    console.log(msgType);

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
        setUniqueID(payload['uniqueID']);
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
        reconnectSuccessHandler();
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
      console.log('roomID stored');
    }
  }, [roomID]);

  useEffect(() => {
    const oldUniqueIDFromSessionStorage = sessionStorage.getItem('oldUniqueID');
    if (!oldUniqueIDFromSessionStorage) {
      sessionStorage.setItem('oldUniqueID', uniqueID);
      console.log('old Unique ID stored');
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
