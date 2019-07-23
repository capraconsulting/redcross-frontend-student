import React, { useState } from 'react';
import { ISocketMessage } from '../../../interfaces/IMessage';
import { TextMessageBuilder } from '../../../services/message-service';
import { ISocketFile } from '../../../interfaces';
import '../../../styles/ChatInput.less';

interface IProps {
  uniqueID: string;
  roomID: string;
  send;
}

const ChatInput = (props: IProps) => {
  const [message, setMessage] = useState<string>('');
  const {uniqueID, roomID, send} = props;

  const sendTextMessage = event => {
    event.preventDefault();
    if (message.length > 0) {
      const msg = new TextMessageBuilder(uniqueID).withMessage(message).toRoom(roomID).build();
      send(msg.createMessage);
      setMessage('');
    }
  };

  const uploadFile = () => {
    const fileInput = document.getElementById('msg-file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const sendFileMessage = (file: File) => {
    // TODO: do with azure
  };

  return (
    <div className={'message-form-container'}>
      <form className={'message-form'}>
        <input
          onChange={event =>
            event.target.files && sendFileMessage(event.target.files[0])
          }
          type="file"
          name="attachment"
          id="msg-file-input"
          accept="image/*|.pdf|.doc|.docx"
          className="file"
        />
        <button type="button" className="upload" onClick={() => uploadFile()}>
          <span className="plus">+</span>
          <div className="tooltip">
            Hvis du sender et vedlegg, må du gjerne fjerne navnet ditt eller
            andre ting fra dokumentet som kan identifisere deg.
          </div>
        </button>
        <input
          className={'message-text'}
          type="textarea"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button
          onClick={event => sendTextMessage(event)}
          className={'send-message'}
        >
          <svg width="30px" height="30px" viewBox="0 0 30 30">
            <polygon className="arrow" points="30 15 0 30 5.5 15 0 0"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
