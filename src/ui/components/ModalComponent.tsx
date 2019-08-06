import React, { MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Cross from '../../assets/Cross';
import '../../styles/modal-component.less';

interface IProps {
  content: string;
  successButtonText?: string;
  warningButtonText?: string;
  successCallback?(e: MouseEvent): void;
  warningCallback?(e: MouseEvent): void;
  hideButtons?: boolean;
  inputFields?: {
    inputText: string;
    buttonText: string;
    callback(): void;
    isDisabled?: boolean;
  }[];
  closingCallback(): void;
}

const ModalComponent = (props: IProps & RouteComponentProps) => {
  const {
    content,
    successButtonText,
    warningButtonText,
    successCallback,
    warningCallback,
    hideButtons,
    inputFields,
    closingCallback,
  } = props;

  const createInputFields = () => {
    if (inputFields) {
      return inputFields.map((inputField, index) => {
        return (
          <div className="input-field" key={index}>
            <input
              className="text"
              type="text"
              defaultValue={inputField.inputText}
              disabled={inputField.isDisabled}
            />
            <button
              onClick={() => {
                inputField.callback();
              }}
              className="button leksehjelp--button-success"
            >
              {inputField.buttonText}
            </button>
          </div>
        );
      });
    }
  };

  return (
    <div className="modal-container">
      <div className="backdrop" onClick={closingCallback} />
      <div className="modal">
        <button
          className="modal--close leksehjelp--button-close"
          onClick={closingCallback}
        >
          <Cross color="black" />
        </button>
        <p className="content-text">{content}</p>
        <div className="input-field-container">{createInputFields()}</div>
        <div className="button-container">
          {!hideButtons && (
            <div className="modal--button-container">
              {successButtonText && (
                <button onClick={successCallback} className="btn btn-submit">
                  {successButtonText}
                </button>
              )}
              {warningButtonText && (
                <button onClick={warningCallback} className="btn btn-warning">
                  {warningButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default withRouter(ModalComponent);
