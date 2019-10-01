import React, { useContext, useEffect, useMemo, useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { withRouter, RouteComponentProps } from 'react-router';
import Zoom from 'react-reveal/Zoom';

// Styles
import '../../../styles/LandingPage.less';
import { ISubject } from '../../../interfaces';
import {
  getIsLeksehjelpOpen,
  getSubjectList,
} from '../../../services/api-service';
import { QueueMessageBuilder } from '../../../services/message-service';
import { CHAT_TYPES, MESSAGE_TYPES } from '../../../../config';
import { toast } from 'react-toastify';
import { SocketContext } from '../../../providers';

interface IProps extends RouteComponentProps {
  isLeksehjelpOpen: boolean;
}

const SectionMestring: React.FC<IProps> = ({ history, isLeksehjelpOpen }) => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const { socketSend, uniqueID, inQueue } = useContext(SocketContext);
  const { MESTRING_VIDEO, MESTRING_TEXT } = CHAT_TYPES;

  const [grade, setGrade] = useState<Option>({
    label: '',
    value: '',
  });
  const [subject, setSubject] = useState<Option>({
    label: '',
    value: '',
  });

  useEffect(() => {
    try {
      getSubjectList('?isMestring=1').then(setSubjects);
    } catch (e) {}
  }, []);

  const getSubjectOptions = (): Option[] => {
    return subjects.map(subject => {
      return {
        value: subject.subjectTitle,
        label: subject.subjectTitle,
      };
    });
  };

  const enterChatQueue = (chatType: string) => {
    getIsLeksehjelpOpen().then(data => {
      if (data.isopen) {
        const msg = new QueueMessageBuilder(MESSAGE_TYPES.ENTER_QUEUE)
          .withSubject(subject.value)
          .withGrade(grade.value)
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

  const weekDays = [
    'Søndag',
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
  ];

  const nextOpeningDay = useMemo(() => {
    const nextOpeningDay = new Date();
    if (nextOpeningDay.getHours() >= 17) {
      nextOpeningDay.setDate(nextOpeningDay.getDate() + 1);
    }
    while (nextOpeningDay.getDay() === 0 || nextOpeningDay.getDay() === 6) {
      nextOpeningDay.setDate(nextOpeningDay.getDate() + 1);
    }
    return weekDays[nextOpeningDay.getDay()].toLowerCase();
  }, []);

  return (
    <div className="help">
      <div>
        <div className="mestring">
          <div className="mestring--badge_new">
            <Zoom>Ny tjeneste!</Zoom>
          </div>
          <div className="mestring--header">Mestring og motivasjon</div>
          {isLeksehjelpOpen ? (
            <>
              <span className="sectioncontainer--header--status">
                stenger klokken 21:00
              </span>
              <p className="sectioncontainer--text">
                Vil du jobbe med motivasjonen? Dempe nervene før eksamen? Prøve
                en ny læringsmetode?
              </p>
            </>
          ) : (
            <span className="sectioncontainer--header--status">
              åpner {nextOpeningDay} klokken 17:00
            </span>
          )}
          <p className="sectioncontainer--text">
            Snakk med en av våre frivillige, enten via chat eller på
            videosamtale!
          </p>
          <form className="mestring--form">
            <div className="mestring--form--header">Velg tema</div>
            <Dropdown
              options={getSubjectOptions()}
              value={subject.value}
              onChange={option => setSubject(option)}
              placeholder="F.eks motivasjon, læringsmetoder"
              placeholderClassName={'dropdown-placeholder'}
              menuClassName={'dropdown-placeholder'}
            />
          </form>
          <button
            className="btn btn-submit"
            disabled={!isLeksehjelpOpen || inQueue}
            onClick={() => enterChatQueue(MESTRING_TEXT)}
          >
            Chat
          </button>{' '}
          <button
            className="btn btn-submit btn-right"
            disabled={!isLeksehjelpOpen || inQueue}
            onClick={() => enterChatQueue(MESTRING_VIDEO)}
          >
            Videochat
          </button>
        </div>
        <div className="cross-my-heart">
          Trenger du noen å snakke med?{' '}
          <a
            href="https://korspaahalsen.rodekors.no/"
            className="cross-my-heart--link"
          >
            Kors på halsen
          </a>
        </div>
      </div>
      <div></div>
      <img
        src={require('../../../assets/images/figure_2.svg')}
        className="help--image"
      />
    </div>
  );
};

export default withRouter(SectionMestring);
