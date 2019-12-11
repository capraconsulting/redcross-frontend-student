// Sections for this page
import React, { useContext, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

//Styles
import '../../styles/LandingPage.less';
// Sections
import {
  SectionHero,
  SectionQuestions,
  SectionLeksehjelp,
  SectionMestring,
  SectionFrivillig,
} from './Sections';
//Components
import { Snackbar, ModalComponent } from '../../ui/components';
import Button from '@material-ui/core/Button';

//Services
import { getIsLeksehjelpOpen } from '../../services/api-service';
import { SocketContext } from '../../providers';
import { useOpeningHours } from '../../providers/LeksehjelpInformationProvider';

const LandingPage = (props: RouteComponentProps) => {
  //const [isLeksehjelpOpen, setIsLeksehjelpOpen] = useState<boolean>(false);
  const { inQueue, roomID, cleanState, studentInfo } = useContext(
    SocketContext,
  );
  const { isOpen } = useOpeningHours();
  //const [isOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { history } = props;

  const cancelQueueAndChat = () => {
    cleanState();
    setIsModalOpen(false);
    history.push('/');
  };

  const { chatType, positionInQueue } = studentInfo;
  return (
    <div className="content">
      <SectionHero />
      {isOpen ? (
        <div>
          <SectionLeksehjelp isLeksehjelpOpen={isOpen} />
          <SectionMestring isLeksehjelpOpen={isOpen} />
          <SectionQuestions />
        </div>
      ) : (
        <div>
          <SectionQuestions />
          <SectionLeksehjelp isLeksehjelpOpen={isOpen} />
          <SectionMestring isLeksehjelpOpen={isOpen} />
        </div>
      )}
      <SectionFrivillig />
      {
        /**Show if user is already in a queue or active chat session */
        <Snackbar
          event={inQueue}
          content={
            inQueue && roomID
              ? 'Du er i en samtale med en frivillig'
              : 'Du står i kø for' +
                (chatType && chatType.includes('LEKSEHJELP')
                  ? ' leksehjelp, '
                  : ' mestring, ') +
                (positionInQueue
                  ? 'som nummer ' + positionInQueue + ' i køen.'
                  : '')
          }
          actions={[
            <Button
              key="do"
              color="primary"
              size="small"
              onClick={() =>
                history.push(
                  roomID
                    ? '/meldinger'
                    : chatType == 'LEKSEHJELP_TEXT'
                    ? '/leksehjelp'
                    : '/mestring',
                )
              }
            >
              {roomID ? 'Gå til samtalen' : 'Åpne kø'}
            </Button>,
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={() => setIsModalOpen(true)}
            >
              {roomID ? 'Avslutt samtalen' : 'Forlat kø'}
            </Button>,
          ]}
        />
      }
      {isModalOpen && (
        <ModalComponent
          content={
            roomID
              ? 'Er du sikker på at du vil avslutte samtalen?'
              : 'Er du sikker på at du vil forlate køen?'
          }
          warningButtonText="Avslutt"
          warningCallback={() => cancelQueueAndChat()}
          closingCallback={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default withRouter(LandingPage);
