export const API_URL = 'http://localhost:8080/';
export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const azureTokens = {
  PUBLIC_SAS_TOKEN: process.env.PUBLIC_SAS_TOKEN,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
};

export const CHAT_URL = 'ws://localhost:8080/ws';

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
  RECONNECT: 'RECONNECT',
  LEAVE_CHAT: 'LEAVE_CHAT',
  CLOSE_CHAT: 'CLOSE_CHAT',
  STUDENT_LEAVE: 'STUDENT_LEAVE',
  UPDATE_ACTIVE_SUBJECTS: 'UPDATE_ACTIVE_SUBJECTS',
};

export const emailValidatorRegExp = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/g;
