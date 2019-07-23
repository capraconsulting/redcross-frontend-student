import { ISocketFile } from '../interfaces';
import {
  IGenerateRoomMessage,
  IEnterQueueMessage,
  ISocketMessage,
  ITextMessage,
} from '../interfaces/IMessage';

const createMessage = (
  payload: ITextMessage | IEnterQueueMessage | IGenerateRoomMessage,
  msgType: string,
): ISocketMessage => {
  return {
    msgType,
    payload,
  };
};

export class EnterQueueMessageBuilder {
  private readonly _uniqueID: string;
  private _nickname: string;
  private _grade: string;
  private _introText: string;
  private _subject: string;
  private _course: string;

  constructor(uniqueID: string) {
    this._uniqueID = uniqueID;
    return this;
  }

  withNickname(value: string): EnterQueueMessageBuilder {
    this._nickname = value;
    return this;
  }

  withGrade(value: string): EnterQueueMessageBuilder {
    this._grade = value;
    return this;
  }

  withIntroText(value: string): EnterQueueMessageBuilder {
    this._introText = value;
    return this;
  }

  withSubject(value: string): EnterQueueMessageBuilder {
    this._subject = value;
    return this;
  }

  withCourse(value: string): EnterQueueMessageBuilder {
    this._course = value;
    return this;
  }

  build(): EnterQueueMessage {
    return new EnterQueueMessage(this);
  }

  get uniqueID(): string {
    return this._uniqueID;
  }

  get nickname(): string {
    return this._nickname;
  }

  get grade(): string {
    return this._grade;
  }

  get introText(): string {
    return this._introText;
  }

  get subject(): string {
    return this._subject;
  }

  get course(): string {
    return this._course;
  }
}

class EnterQueueMessage {
  private readonly uniqueID: string;
  private readonly nickname: string;
  private readonly grade: string;
  private readonly introText: string;
  private readonly subject: string;
  private readonly course: string;

  constructor(enterQueueMessageBuilder: EnterQueueMessageBuilder) {
    this.uniqueID = enterQueueMessageBuilder.uniqueID;
    this.nickname = enterQueueMessageBuilder.nickname;
    this.grade = enterQueueMessageBuilder.grade;
    this.introText = enterQueueMessageBuilder.introText;
    this.subject = enterQueueMessageBuilder.subject;
    this.course = enterQueueMessageBuilder.course;
  }

  get createMessage(): ISocketMessage {
    const msg: IEnterQueueMessage = {
      uniqueID: this.uniqueID,
      nickname: this.nickname,
      grade: this.grade,
      introText: this.introText,
      course: this.course,
      subject: this.subject,
    };
    return createMessage(msg, 'ENTER_QUEUE');
  }
}

export class TextMessageBuilder {
  private readonly _uniqueID: string;
  private _roomID: string;
  private _message: string;

  constructor(uniqueID: string) {
    this._uniqueID = uniqueID;
    return this;
  }

  withMessage(message: string): TextMessageBuilder {
    this._message = message;
    return this;
  }

  toRoom(roomID: string): TextMessageBuilder {
    this._roomID = roomID;
    return this;
  }

  build(): TextMessage {
    return new TextMessage(this);
  }

  get roomID(): string {
    return this._roomID;
  }

  get uniqueID(): string {
    return this._uniqueID;
  }

  get message(): string {
    return this._message;
  }
}

class TextMessage {
  private readonly roomID: string;
  private readonly uniqueID: string;
  private readonly message: string;

  constructor(textMessageBuilder: TextMessageBuilder) {
    this.roomID = textMessageBuilder.roomID;
    this.message = textMessageBuilder.message;
    this.uniqueID = textMessageBuilder.uniqueID;
  }

  get createMessage(): ISocketMessage {
    const msg: ITextMessage = {
      author: 'student',
      uniqueID: this.uniqueID,
      roomID: this.roomID,
      message: this.message,
    };
    return createMessage(msg, 'TEXT');
  }
}
