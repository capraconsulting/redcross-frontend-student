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
import { DirectionSnackbar, ModalComponent } from '../../ui/components';
import Button from '@material-ui/core/Button';

//Services
import { getIsLeksehjelpOpen } from '../../services/api-service';
import { SocketContext } from '../../providers';

const LandingPage = (props: RouteComponentProps) => {
  const [isLeksehjelpOpen, setIsLeksehjelpOpen] = useState<boolean>(false);
  const { inQueue, roomID, cleanState } = useContext(SocketContext);
  const [isOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { history } = props;
  useEffect(() => {
    getIsLeksehjelpOpen().then(data => setIsLeksehjelpOpen(data.isopen));
  }, []);

  const cancelQueueAndChat = () => {
    cleanState();
    setIsModalOpen(false);
    history.push('/');
  };

  return (
    <div className="content">
      <SectionHero />
      {isLeksehjelpOpen ? (
        <div>
          <SectionLeksehjelp />
          <SectionMestring />
          <SectionQuestions />
        </div>
      ) : (
        <div>
          <SectionQuestions />
          <SectionLeksehjelp />
          <SectionMestring />
        </div>
      )}
      <SectionFrivillig />
      <DirectionSnackbar
        event={inQueue}
        content={
          roomID ? 'Du er i en samtale med en frivillig' : 'Du står i kø'
        }
        actions={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={() => setIsModalOpen(true)}
          >
            Avslutt
          </Button>,
        ]}
      />
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

export default withRouter(LandingPage);
