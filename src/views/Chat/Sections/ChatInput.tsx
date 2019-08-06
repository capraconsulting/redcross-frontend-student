import React, { useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import Zoom from 'react-reveal/Zoom';

//Services
import { TextMessageBuilder } from '../../../services/message-service';
import { uploadFileToAzureBlobStorage } from '../../../services/azure-service';

//Styles
import '../../../styles/ChatInput.less';

//Components
import { IconButton } from '../../../ui/components';

//Interfaces
import { IFile, ISocketMessage } from '../../../interfaces';
import { SocketContext } from '../../../providers';
import { addMessageAction } from '../../../reducers';

interface IProps {
  uniqueID: string;
  roomID: string;
}

const ChatInput = (props: IProps) => {
  const [message, setMessage] = useState<string>('');
  const [tempFiles, setTempFiles] = useState([] as any[]);
  const { socketSend, dispatchMessages } = useContext(SocketContext);
  const { uniqueID, roomID } = props;

  const uploadPromises = tempFiles => {
    return tempFiles.map(async file => {
      return uploadFileToAzureBlobStorage('chatfiles', roomID, file);
    });
  };

  const sendTextMessage = (event, files) => {
    event.preventDefault();
    if (message.length > 0 || files.length > 0) {
      const msg = new TextMessageBuilder(uniqueID)
        .withMessage(message)
        .withFiles(files)
        .toRoom(roomID)
        .withImgUrl(message)
        .build();

      const socketMessage = msg.createMessage;
      if (socketMessage) {
        socketSend(socketMessage);
        dispatchMessages(addMessageAction(socketMessage));
        setMessage('');
        setTempFiles([] as any[]);
      }
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    return Promise.all<IFile>(uploadPromises(tempFiles)).then(results => {
      sendTextMessage(event, results);
    });
  };

  const openFileDialog = () => {
    const ref = document.getElementById('file-dialog');
    ref && ref.click();
  };

  const onDrop = useCallback(
    acceptedFiles => {
      setTempFiles([...tempFiles, ...acceptedFiles]);
    },
    [tempFiles],
  );
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const FileList = () => {
    return (
      <ul className="filelist">
        {tempFiles.map((file, index) => {
          const { name } = file;
          return (
            <li key={index}>
              <Zoom>
                <span>
                  <a
                    className="filelist-ankertag"
                    href={URL.createObjectURL(file)}
                    title={name}
                    download={name}
                  >
                    {name}{' '}
                  </a>
                  <IconButton
                    onClick={() => {
                      setTempFiles(tempFiles.filter((_, i) => i !== index));
                    }}
                  />{' '}
                </span>
              </Zoom>
            </li>
          );
        })}
      </ul>
    );
  };

  function renderInput() {
    return (
      <input
        className={'message-text'}
        type="textarea"
        value={message}
        onChange={event => {
          setMessage(event.target.value);
        }}
      />
    );
  }

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <input
        onChange={event => {
          let { files } = event.target;
          let newFiles = [] as any;
          let steps = (files && files.length) || 0;
          for (var i = 0; i < steps; i++) {
            let item = (files && files.item(i)) || 'null';
            newFiles.push(item);
          }
          files && setTempFiles([...tempFiles, ...newFiles]);
        }}
        type="file"
        name="attachment"
        id="msg-file-input"
        accept="image/*|.pdf|.doc|.docx"
        className="file"
      />
      <div className={'message-form-container'}>
        <form className={'message-form'}>
          <button
            type="button"
            className="upload"
            onClick={() => openFileDialog()}
          >
            <input
              type="file"
              id="file-dialog"
              className="input-file"
              accept="image/*|.pdf|.doc|.docx|.csv"
              onChange={event => {
                let { files } = event.target;
                let newFiles = [] as any;
                let steps = (files && files.length) || 0;
                for (var i = 0; i < steps; i++) {
                  let item = (files && files.item(i)) || 'null';
                  newFiles.push(item);
                }
                files && setTempFiles([...tempFiles, ...newFiles]);
              }}
            />
            <span className="plus">+</span>
            <div className="tooltip">
              Hvis du sender et vedlegg, må du gjerne fjerne navnet ditt eller
              andre ting fra dokumentet som kan identifisere deg.
            </div>
          </button>
          {renderInput()}
          <button onClick={handleSubmit} className={'send-message'}>
            <svg width="30px" height="30px" viewBox="0 0 30 30">
              <polygon className="arrow" points="30 15 0 30 5.5 15 0 0" />
            </svg>
          </button>
        </form>
        <FileList />
      </div>
    </div>
  );
};

export default ChatInput;
