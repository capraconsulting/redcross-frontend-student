import {
  IGenerateRoomMessage,
  IEnterQueueMessage,
  ISocketMessage,
  ITextMessage
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

class TextMessage {
  private readonly roomID: string;
  private readonly uniqueID: string;
  private readonly message: string;

  public constructor(textMessageBuilder: TextMessageBuilder) {
    this.roomID = textMessageBuilder.roomID;
    this.message = textMessageBuilder.message;
    this.uniqueID = textMessageBuilder.uniqueID;
  }

  public get createMessage(): ISocketMessage {
    const msg: ITextMessage = {
      author: 'student',
      uniqueID: this.uniqueID,
      roomID: this.roomID,
      message: this.message,
    };
    return createMessage(msg, 'TEXT');
  }
}

class EnterQueueMessage {
  private readonly uniqueID: string;
  private readonly nickname: string;
  private readonly grade: string;
  private readonly introText: string;
  private readonly subject: string;
  private readonly course: string;

  public constructor(enterQueueMessageBuilder: EnterQueueMessageBuilder) {
    this.uniqueID = enterQueueMessageBuilder.uniqueID;
    this.nickname = enterQueueMessageBuilder.nickname;
    this.grade = enterQueueMessageBuilder.grade;
    this.introText = enterQueueMessageBuilder.introText;
    this.subject = enterQueueMessageBuilder.subject;
    this.course = enterQueueMessageBuilder.course;
  }

  public get createMessage(): ISocketMessage {
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

export class EnterQueueMessageBuilder {
  private readonly _uniqueID: string;
  private _nickname: string;
  private _grade: string;
  private _introText: string;
  private _subject: string;
  private _course: string;

  public constructor(uniqueID: string) {
    this._uniqueID = uniqueID;
    return this;
  }

  public withNickname(value: string): EnterQueueMessageBuilder {
    this._nickname = value;
    return this;
  }

  public withGrade(value: string): EnterQueueMessageBuilder {
    this._grade = value;
    return this;
  }

  public withIntroText(value: string): EnterQueueMessageBuilder {
    this._introText = value;
    return this;
  }

  public withSubject(value: string): EnterQueueMessageBuilder {
    this._subject = value;
    return this;
  }

  public withCourse(value: string): EnterQueueMessageBuilder {
    this._course = value;
    return this;
  }

  public build(): EnterQueueMessage {
    return new EnterQueueMessage(this);
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
}

export class TextMessageBuilder {
  private readonly _uniqueID: string;
  private _roomID: string;
  private _message: string;

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
}
