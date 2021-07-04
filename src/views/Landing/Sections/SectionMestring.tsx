import React, { useContext, useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { RouteComponentProps, withRouter } from 'react-router';
import Zoom from 'react-reveal/Zoom';

import { getIsLeksehjelpOpen } from '../../../services/api-service';
import { QueueMessageBuilder } from '../../../services/message-service';
import { CHAT_TYPES, MESSAGE_TYPES } from '../../../../config';
import { toast } from 'react-toastify';
import { SocketContext } from '../../../providers';
import { useOpeningHours } from '../../../providers/OpeningHoursProvider';
import { useSubjects } from '../../../hooks/use-subjects';
// Styles
import '../../../styles/LandingPage.less';
import { useSubjectStatusMessage } from '../../../hooks/use-subject-status-message';

const SectionMestring: React.FC<RouteComponentProps> = ({ history }) => {
  const { socketSend, uniqueID, inQueue, activeSubjects } = useContext(
    SocketContext,
  );

  const subjects = useSubjects(true, s => s.subjectTitle);

  const { MESTRING_VIDEO, MESTRING_TEXT } = CHAT_TYPES;

  const [subject, setSubject] = useState<Option>({
    label: '',
    value: '',
  });

  const subjectStatusMessage = useSubjectStatusMessage(subject);

  const { isOpen, openingMessage } = useOpeningHours();

  const enterChatQueue = (chatType: string) => {
    getIsLeksehjelpOpen().then(data => {
      if (data.isopen) {
        const msg = new QueueMessageBuilder(MESSAGE_TYPES.ENTER_QUEUE)
          .withSubject(subject.value)
          .withGrade('')
          .withUniqueID(uniqueID)
          .withChatType(chatType)
          .build();

        socketSend(msg.createMessage);
        history.push('mestring');
      } else {
        toast.error('Mestringschatten er dessverre ikke åpen');
      }
    });
  };

  const isActiveSubject = (subject: string): boolean => {
    return activeSubjects.indexOf(subject) >= 0;
  };

  return (
    <div className="help">
      <div>
        <div className="mestring">
          <div className="mestring--badge_new">
            <Zoom>Ny tjeneste!</Zoom>
          </div>
          <div className="sectioncontainer--header">
            Mestring og motivasjon{' '}
            <span className="sectioncontainer--header--status">
              {isOpen ? 'åpen nå' : openingMessage}
            </span>
          </div>

          {isOpen && (
            <p className="sectioncontainer--text">
              Vil du jobbe med motivasjonen? Dempe nervene før eksamen? Prøve en{' '}
              ny læringsmetode?
            </p>
          )}
          <form className="mestring--form">
            <div className="mestring--form--header">Velg tema</div>
            <Dropdown
              options={subjects}
              value={subject.value}
              onChange={setSubject}
              placeholder="F.eks motivasjon, læringsmetoder"
              placeholderClassName={'dropdown-placeholder'}
              menuClassName={'dropdown-placeholder'}
            />
            {subjectStatusMessage && (
              <p className="sectioncontainer--text">{subjectStatusMessage}</p>
            )}
          </form>
          {isOpen && (
            <div className="button-container">
              <button
                className="btn btn-submit"
                disabled={!isOpen || inQueue || !isActiveSubject(subject.value)}
                onClick={() => enterChatQueue(MESTRING_TEXT)}
              >
                Chat
              </button>{' '}
              <button
                className="btn btn-submit btn-right"
                disabled={!isOpen || inQueue || !isActiveSubject(subject.value)}
                onClick={() => enterChatQueue(MESTRING_VIDEO)}
              >
                Videochat
              </button>
            </div>
          )}
        </div>
        <div className="cross-my-heart">
          Trenger du noen å snakke med?{' '}
          <a
            href="https://korspaahalsen.rodekors.no/"
            className="cross-my-heart--link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kors på halsen
          </a>
        </div>
      </div>
      <div />
      <img
        alt=""
        src={require('../../../assets/images/figure_2.svg')}
        className="help--image"
      />
    </div>
  );
};

export default withRouter(SectionMestring);
