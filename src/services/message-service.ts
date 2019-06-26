import { IMessage } from '../interfaces';

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
