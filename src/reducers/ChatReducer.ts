import { ISocketMessage, ITextMessage } from '../interfaces/IMessage';
import { createAction, createReducer } from 'typesafe-actions';
import { IAction } from '../interfaces';

export const addMessageAction = createAction('ADD_MESSAGE', cb => {
  return (message: ISocketMessage) => cb({ message });
});

const addMessageHandler = (
  state: ITextMessage[],
  action: IAction,
): ITextMessage[] => {
  const {
    author,
    roomID,
    uniqueID,
    message,
    datetime,
  } = action.payload.message.payload;
  const newMessage: ITextMessage = {
    author,
    roomID,
    uniqueID,
    message,
    datetime,
  };
  state.push(newMessage);
  return [...state];
};

export const chatReducer = createReducer<ITextMessage[], IAction>(
  [],
).handleAction(addMessageAction, addMessageHandler);
