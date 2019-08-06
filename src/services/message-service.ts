import {
  IGenerateRoomMessage,
  IQueueMessage,
  IReconnectMessage,
  ISocketMessage,
  ITextMessage,
} from '../interfaces';
import { MESSAGE_TYPES } from '../../config';
import { IFile } from '../interfaces';

const { TEXT, RECONNECT } = MESSAGE_TYPES;
const createMessage = (
  payload:
    | ITextMessage
    | IQueueMessage
    | IGenerateRoomMessage
    | IReconnectMessage,
  msgType: string,
): ISocketMessage => {
  return {
    msgType,
    payload,
  };
};

export const createReconnectMessage = (uniqueID: string): ISocketMessage => {
  const msg: IReconnectMessage = { uniqueID };
  return createMessage(msg, RECONNECT);
};

class TextMessage {
  private readonly roomID: string;
  private readonly uniqueID: string;
  private readonly message: string;
  private readonly files: IFile[];
  private readonly imgUrl: string;

  public constructor(textMessageBuilder: TextMessageBuilder) {
    this.roomID = textMessageBuilder.roomID;
    this.message = textMessageBuilder.message;
    this.uniqueID = textMessageBuilder.uniqueID;
    this.files = textMessageBuilder.files;
    this.imgUrl = textMessageBuilder.imgUrl;
  }

  public get createMessage() {
    const msg: ITextMessage = {
      author: 'student',
      uniqueID: this.uniqueID,
      roomID: this.roomID,
      message: this.message,
      files: this.files,
      imgUrl: this.imgUrl,
    };
    if (this.files.length > 0 || this.message.length > 0) {
      return createMessage(msg, TEXT);
    } else {
      return null;
    }
  }
}
  class QueueMessage {
  private readonly uniqueID: string;
  private readonly nickname: string;
  private readonly grade: string;
  private readonly introText: string;
  private readonly subject: string;
  private readonly chatType: string;
  private readonly themes: string[];
  private readonly messageType: string;

  public constructor(queueMessageBuilder: QueueMessageBuilder) {
    this.uniqueID = queueMessageBuilder.uniqueID;
    this.nickname = queueMessageBuilder.nickname;
    this.grade = queueMessageBuilder.grade;
    this.introText = queueMessageBuilder.introText;
    this.subject = queueMessageBuilder.subject;
    this.chatType = queueMessageBuilder.chatType;
    this.themes = queueMessageBuilder.themes;
    this.messageType = queueMessageBuilder.messageType;
  }

  public get createMessage(): ISocketMessage {
    const msg: IQueueMessage = {
      uniqueID: this.uniqueID,
      nickname: this.nickname,
      grade: this.grade,
      introText: this.introText,
      subject: this.subject,
      chatType: this.chatType,
      themes: this.themes,
    };
    return createMessage(msg, this.messageType);
  }
}

export class QueueMessageBuilder {
  private readonly _messageType: string;
  private _uniqueID: string;
  private _nickname: string;
  private _grade: string;
  private _introText: string;
  private _subject: string;
  private _chatType: string;
  private _themes: string[];

  public constructor(messageType: string) {
    this._messageType = messageType;
    return this;
  }

  public withChatType(value: string): QueueMessageBuilder {
    this._chatType = value;
    return this;
  }

  public withNickname(value: string): QueueMessageBuilder {
    this._nickname = value;
    return this;
  }

  public withGrade(value: string): QueueMessageBuilder {
    this._grade = value;
    return this;
  }

  public withIntroText(value: string): QueueMessageBuilder {
    this._introText = value;
    return this;
  }

  public withSubject(value: string): QueueMessageBuilder {
    this._subject = value;
    return this;
  }

  public withUniqueID(value: string): QueueMessageBuilder {
    this._uniqueID = value;
    return this;
  }

  public withThemes(value: string[]): QueueMessageBuilder {
    this._themes = value;
    return this;
  }

  public build(): QueueMessage {
    return new QueueMessage(this);
  }

  public get uniqueID(): string {
    return this._uniqueID;
  }

  public get nickname(): string {
    return this._nickname;
  }

  public get grade(): string {
    return this._grade;
  }

  public get introText(): string {
    return this._introText;
  }

  public get subject(): string {
    return this._subject;
  }

  public get chatType(): string {
    return this._chatType;
  }

  public get messageType(): string {
    return this._messageType;
  }

  public get themes(): string[] {
    return this._themes;
  }
}

export class TextMessageBuilder {
  private readonly _uniqueID: string;
  private _roomID: string;
  private _message: string;
  private _files: IFile[];
  private _imgUrl: string;

  public constructor(uniqueID: string) {
    this._uniqueID = uniqueID;
    return this;
  }

  public withMessage(message: string): TextMessageBuilder {
    this._message = message;
    return this;
  }

  public toRoom(roomID: string): TextMessageBuilder {
    this._roomID = roomID;
    return this;
  }

  public withImgUrl(imgUrl: string): TextMessageBuilder {
    this._imgUrl = imgUrl;
    return this;
  }

  public withFiles(files: IFile[]): TextMessageBuilder {
    this._files = files;
    return this;
  }

  public build(): TextMessage {
    return new TextMessage(this);
  }

  public get roomID(): string {
    return this._roomID;
  }

  public get imgUrl(): string {
    return this._imgUrl;
  }
  public get uniqueID(): string {
    return this._uniqueID;
  }

  public get message(): string {
    return this._message;
  }

  public get files(): IFile[] {
    return this._files;
  }
}
