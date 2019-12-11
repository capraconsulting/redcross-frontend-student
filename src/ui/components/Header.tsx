import React, { useState, useEffect, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Zoom from 'react-reveal/Zoom';

//Styles
import '../../styles/Header.less';

//Services
import getApplicationTitle from '../../services/header-service';
import { SocketContext } from '../../providers';
import ModalComponent from './ModalComponent';
import { ICustomWindow } from '../../interfaces/ICustomWindow';
import { CHAT_TYPES } from '../../../config';
import { useNextOpeningDay } from '../../hooks/use-next-opening-day';
import { useOpeningHours } from '../../providers/LeksehjelpInformationProvider';

declare const window: ICustomWindow;

export const Header = (props: RouteComponentProps) => {
  let { history } = props;

  const { inQueue, roomID, cleanState, studentInfo } = useContext(
    SocketContext,
  );
  const openingHours = useOpeningHours();
  //const [isLeksehjelpOpen, setIsLeksehjelpOpen] = useState<boolean>(false);
  //const [information, setInformation] = useState<IInformation>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const cancelQueueAndChat = () => {
    if (
      roomID &&
      (studentInfo.chatType === CHAT_TYPES.LEKSEHJELP_TEXT ||
        studentInfo.chatType === CHAT_TYPES.LEKSEHJELP_VIDEO)
    ) {
      window._gscq.push(['show', process.env.GETSITECONTROL_WIDGET_ID]);
    }
    cleanState();
    setIsModalOpen(false);
    history.push('/');
  };

  const nextOpeningDay = useNextOpeningDay();

  return (
    <div className="header">
      <a className="header--link" onClick={() => history.push('/')}>
        <span className="header--logo" id="header--logo">
          {getApplicationTitle('Digital Leksehjelp')}
        </span>
        <span className="header--serviceStatusMessage">
          {!openingHours.isOpen && ` åpner ${nextOpeningDay} kl. 17:00`}
          {openingHours.isOpen && ' åpent frem til kl. 21:00'}
        </span>
      </a>
      {inQueue && (
        <div className="header-button-container">
          <button
            className="header-button"
            onClick={() => setIsModalOpen(true)}
          >
            {roomID ? 'Avslutt samtale' : 'Forlat kø'}
          </button>
        </div>
      )}
      <span>
        <a
          href="https://www.rodekors.no/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="header--rk_logo"
            src={require('../../assets/images/rk_logo.png')}
          />
        </a>
      </span>

      {isModalOpen && (
        <ModalComponent
          content={
            roomID
              ? 'Er du sikker på at du vil avslutte samtalen?'
              : 'Er du sikker på at du vil avslutte køen?'
          }
          warningButtonText="Avslutt"
          warningCallback={() => cancelQueueAndChat()}
          closingCallback={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default withRouter(Header);
