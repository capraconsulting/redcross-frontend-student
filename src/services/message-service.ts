import {
  IGenerateRoomMessage,
  IQueueMessage,
  ISocketMessage,
  ITextMessage,
} from '../interfaces/IMessage';
import { MESSAGE_TYPES } from '../../config';
import { IFile } from '../interfaces';

const {
  TEXT,
  DISTRIBUTE_ROOM,
  CONNECTION,
  ENTER_QUEUE,
  UPDATE_QUEUE,
} = MESSAGE_TYPES;
const createMessage = (
  payload: ITextMessage | IQueueMessage | IGenerateRoomMessage,
  msgType: string,
): ISocketMessage => {
  return {
    msgType,
    payload,
  };
};

class TextMessage {
  private readonly roomID: string;
  private readonly uniqueID: string;
  private readonly message: string;
  private readonly files: IFile[];

  public constructor(textMessageBuilder: TextMessageBuilder) {
    this.roomID = textMessageBuilder.roomID;
    this.message = textMessageBuilder.message;
    this.uniqueID = textMessageBuilder.uniqueID;
    this.files = textMessageBuilder.files;
  }

  public get createMessage(): ISocketMessage | null {
    const msg: ITextMessage = {
      author: 'student',
      uniqueID: this.uniqueID,
      roomID: this.roomID,
      message: this.message,
      files: this.files,
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
  private readonly course: string;
  private readonly chatType: string;

  private readonly messageType: string;

  public constructor(queueMessageBuilder: QueueMessageBuilder) {
    this.uniqueID = queueMessageBuilder.uniqueID;
    this.nickname = queueMessageBuilder.nickname;
    this.grade = queueMessageBuilder.grade;
    this.introText = queueMessageBuilder.introText;
    this.subject = queueMessageBuilder.subject;
    this.course = queueMessageBuilder.course;
    this.chatType = queueMessageBuilder.chatType;

    this.messageType = queueMessageBuilder.messageType;
  }

  public get createMessage(): ISocketMessage {
    const msg: IQueueMessage = {
      uniqueID: this.uniqueID,
      nickname: this.nickname,
      grade: this.grade,
      introText: this.introText,
      course: this.course,
      subject: this.subject,
      chatType: this.chatType,
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
  private _course: string;
  private _chatType: string;

  public constructor(messageType: string) {
    this._messageType = messageType;
    return this;
  }

  /*public withQueueMessageJSON(obj: IQueueMessage) {
    this._uniqueID = obj.uniqueID;
    this._nickname = obj.nickname;
    this._grade = obj.grade;
    this._introText = obj.introText;
    this._subject = obj.subject;
    this._course = obj.course;
    this._chatType = obj.chatType;
  }*/

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

  public withCourse(value: string): QueueMessageBuilder {
    this._course = value;
    return this;
  }

  public withUniqueID(value: string): QueueMessageBuilder {
    this._uniqueID = value;
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

  public get course(): string {
    return this._course;
  }

  public get chatType(): string {
    return this._chatType;
  }

  public get messageType(): string {
    return this._messageType;
  }
}

export class TextMessageBuilder {
  private readonly _uniqueID: string;
  private _roomID: string;
  private _message: string;
  private _files: IFile[];

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
  public withFile(files: IFile[]): TextMessageBuilder {
    this._files = files;
    return this;
  }

  public build(): TextMessage {
    return new TextMessage(this);
  }

  public get roomID(): string {
    return this._roomID;
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
