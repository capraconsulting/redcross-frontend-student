export const API_URL = 'http://localhost:8080/';
export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export const CHAT_URL = 'ws://localhost:3002/events';

export const CHAT_TYPES = {
  LEKSEHJELP_TEXT: 'LEKSEHJELP_TEXT',
  LEKSEHJELP_VIDEO: 'LEKSEHJELP_VIDEO',
  MESTRING_TEXT: 'MESTRING_TEXT',
  MESTRING_VIDEO: 'MESTRING_VIDEO',
};

export const MESSAGE_TYPES = {
  TEXT: 'TEXT',
  ENTER_QUEUE: 'ENTER_QUEUE',
  UPDATE_QUEUE: 'UPDATE_QUEUE',
  CONFIRMED_QUEUE: 'CONFIRMED_QUEUE',
  DISTRIBUTE_ROOM: 'DISTRIBUTE_ROOM',
  CONNECTION: 'CONNECTION',
};
