import {
  IReconnectMessage,
  IGenerateRoomMessage,
  IQueueMessage,
  ITextMessage,
} from './';

export interface ISocketMessage {
  msgType: string;
  payload:
    | ITextMessage
    | IGenerateRoomMessage
    | IQueueMessage
    | IReconnectMessage;
}
