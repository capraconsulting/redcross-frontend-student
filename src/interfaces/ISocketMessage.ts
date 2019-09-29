import {
  IReconnectMessage,
  IGenerateRoomMessage,
  IQueueMessage,
  ITextMessage,
  IActiveSubjectsMessage,
} from './';

export interface ISocketMessage {
  msgType: string;
  payload:
    | ITextMessage
    | IGenerateRoomMessage
    | IQueueMessage
    | IReconnectMessage
    | IActiveSubjectsMessage;
}
