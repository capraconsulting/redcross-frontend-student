import { IMessage, ISocketFile } from '../interfaces';

export const createEnterWaitingRoomMessage = (): IMessage => {
  return {
    author: 'student',
    roomID: '',
    uniqueID: '',
    message: '',
    datetime: new Date(0),
    enterWaitingRoom: true,
    createNewRoom: true
  };
};

export const createTextMessage = (message: string): IMessage => {
  return {
    author: 'student',
    roomID: '',
    uniqueID: '',
    message,
    datetime: new Date(),
    enterWaitingRoom: false,
    createNewRoom: false,
  };
};

export const createFileMessage = (file: ISocketFile): IMessage => {
  return {
    author: 'student',
    roomID: '',
    uniqueID: '',
    message: file,
    datetime: new Date(),
    enterWaitingRoom: false,
    createNewRoom: false,
  };
};

export const createSelectFromWaitingRoomMessage = (helpID: string): IMessage => {
  return {
    author: 'volounteer',
    roomID: '',
    uniqueID: '',
    message: helpID,
    datetime: new Date(0),
    enterWaitingRoom: false,
    createNewRoom: true
  };
};
