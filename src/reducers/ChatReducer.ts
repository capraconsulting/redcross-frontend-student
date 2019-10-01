import { ISocketMessage, ITextMessage, IFile } from '../interfaces';
import { createAction, createReducer } from 'typesafe-actions';
import { IAction } from '../interfaces';
import { getTimeStringNow } from '../services/date-service';

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
  return (messages: ITextMessage[]) => cb({ messages });
});

export const cleanChatAction = createAction('CLEAN', cb => {
  return () => cb({});
});

const addMessageHandler = (
  state: ITextMessage[],
  action: IAction,
): ITextMessage[] => [
  ...state,
  {
    ...action.payload.message.payload,
    datetime: getTimeStringNow(),
  },
];

const handleHasLeftChat = (state: ITextMessage[], action: IAction) => [
  ...state,
  {
    author: action.payload.name,
    message: 'har forlatt chatten.',
    roomID: '',
    uniqueID: 'NOTIFICATION',
    files: [] as IFile[],
    imgUrl: '',
  },
];

const handleChatClosed = (state: ITextMessage[], action: IAction) => [
  ...state,
  {
    author: '',
    message:
      'Alle frivillige har forlatt chatten.\n Du kan fortsette å lese meldingene og se filene som er sendt så lenge nettleservinduet er åpent.',
    roomID: '',
    uniqueID: 'NOTIFICATION',
    files: [] as IFile[],
    imgUrl: '',
  },
];

const handleCleanChat = (state: ITextMessage[], action: IAction) => {
  return [];
};

const handleReconnectChat = (state: ITextMessage[], action: IAction) => {
  return action.payload.messages;
};

export const chatReducer = createReducer<ITextMessage[], IAction>([])
  .handleAction(addMessageAction, addMessageHandler)
  .handleAction(hasLeftChatAction, handleHasLeftChat)
  .handleAction(chatClosedAction, handleChatClosed)
  .handleAction(reconnectChatAction, handleReconnectChat)
  .handleAction(cleanChatAction, handleCleanChat);
