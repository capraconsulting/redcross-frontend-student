import { ISocketMessage, ITextMessage } from '../interfaces';
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

const handleHasLeftChat = (state: ITextMessage[], action: IAction) => {
  state.push({
    author: action.payload.name,
    message: 'Har forlatt chatten.',
    roomID: '',
    uniqueID: 'NOTIFICATION',
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
  });
  return [...state];
};

export const chatReducer = createReducer<ITextMessage[], IAction>([])
  .handleAction(addMessageAction, addMessageHandler)
  .handleAction(hasLeftChatAction, handleHasLeftChat)
  .handleAction(chatClosedAction, handleChatClosed);
