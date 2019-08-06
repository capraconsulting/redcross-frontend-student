export interface IQueueMessage {
  nickname: string;
  subject: string;
  themes: string[];
  grade: string;
  uniqueID: string;
  introText: string;
  chatType: string;
  positionInQueue?: number;
}
