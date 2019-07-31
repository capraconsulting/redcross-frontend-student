import { ISocketMessage, ITextMessage, IFile } from '../interfaces';
import { createAction, createReducer } from 'typesafe-actions';
import { IAction } from '../interfaces';

export const addMessageAction = createAction('ADD_MESSAGE', cb => {
  return (message: ISocketMessage) => cb({ message });
});

export const hasLeftChatAction = createAction('HAS_LEFT_CHAT', cb => {
  return (name: string) => cb({ name });
});

export const chatClosedAction = createAction('CLOSE_CHAT', cb => {
  return () => cb({});
});

export const reconnectChatAction = createAction('RECONNECT', cb => {
  return (messages: ITextMessage[]) => cb({messages});
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
    files,
  } = action.payload.message.payload;
  const newMessage: ITextMessage = {
    author,
    roomID,
    uniqueID,
    message,
    datetime,
    files,
  };
  state.push(newMessage);
  return [...state];
};

const handleHasLeftChat = (state: ITextMessage[], action: IAction) => {
  state.push({
    author: action.payload.name,
    message: 'Har forlatt chatten.',
    roomID: '',
    uniqueID: 'NOTIFICATION',
    files: [] as IFile[],
  });
  return [...state];
};

const handleChatClosed = (state: ITextMessage[], action: IAction) => {
  state.push({
    author: '',
    message:
      'Alle frivillige har forlatt chatten.\n Du kan fortsette å lese meldingene og se filene som er sendt så lenge nettleservinduet er åpent.',
    roomID: '',
    uniqueID: 'NOTIFICATION',
    files: [] as IFile[],
  });
  return [...state];
};

const handleReconnectChat = (state: ITextMessage[], action: IAction) => {
  return action.payload.messages;
};

export const chatReducer = createReducer<ITextMessage[], IAction>([])
  .handleAction(addMessageAction, addMessageHandler)
  .handleAction(hasLeftChatAction, handleHasLeftChat)
  .handleAction(chatClosedAction, handleChatClosed)
  .handleAction(reconnectChatAction, handleReconnectChat);
