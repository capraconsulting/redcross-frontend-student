import React, { useContext, useState } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { RouteComponentProps, withRouter } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
//Styles
import '../../../styles/LandingPage.less';
//Interfaces
import { IQueueMessage } from '../../../interfaces';
//Services
import { getIsLeksehjelpOpen } from '../../../services/api-service';
import { QueueMessageBuilder } from '../../../services/message-service';
//Providers & reducers
import { SocketContext } from '../../../providers';
import { initStudentInfoAction } from '../../../reducers';
import { useOpeningMessage } from '../../../hooks/use-opening-message';
//Configurations
import { CHAT_TYPES, MESSAGE_TYPES } from '../../../../config';
import grades from '../../../grades';
import { useOpeningHours } from '../../../providers/LeksehjelpInformationProvider';
import { useSubjects } from '../../../hooks/use-subjects';
import { useSubjectStatusMessage } from '../../../hooks/use-subject-status-message';

const GRADE_OPTIONS = grades.map(grade => ({
  value: grade.gradeID,
  label: grade.label,
}));

const SectionLeksehjelp: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    uniqueID,
    socketSend,
    dispatchStudentInfo,
    inQueue,
    activeSubjects,
  } = useContext(SocketContext);
  const { isOpen: isLeksehjelpOpen } = useOpeningHours();

  const subjects = useSubjects(false, s => s.id.toString());

  const [subject, setSubject] = useState<Option>({
    value: '',
    label: '',
  });
  const [grade, setGrade] = useState<Option>({
    value: '',
    label: '',
  });

  const subjectStatusMessage = useSubjectStatusMessage(subject);

  const openingMessage = useOpeningMessage(false);

  const isActiveSubject = (subject: React.ReactNode): boolean => {
    return typeof subject === 'string' && activeSubjects.indexOf(subject) >= 0;
  };

  const enterChatQueue = (chatType: string) => {
    getIsLeksehjelpOpen().then(data => {
      if (data.isopen) {
        const msg = new QueueMessageBuilder(MESSAGE_TYPES.ENTER_QUEUE)
          .withSubject(subject.label as string)
          .withGrade(grade.label as string)
          .withUniqueID(uniqueID)
          .withChatType(chatType)
          .build();
        dispatchStudentInfo(
          initStudentInfoAction(msg.createMessage.payload as IQueueMessage),
        );
        socketSend(msg.createMessage);
        history.push('leksehjelp');
      } else {
        toast.error('Leksehjelpen er dessverre ikke åpen');
      }
    });
  };

  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Leksehjelp</div>
      <span className="sectioncontainer--header--status">{openingMessage}</span>
      {isLeksehjelpOpen && (
        <p className="sectioncontainer--text" id="leksehjelpcontainer--text">
          Få hjelp av en frivillig til å løse oppgaver, diskutere et tema,{' '}
          skrive tekster eller øve til prøver. Start en chat eller videosamtale!
        </p>
      )}
      <form className="sectioncontainer--form">
        <div
          className="sectioncontainer--form--header"
          id="leksehjelp--form--header"
        >
          Velg fag <span className="error-message">*</span>
        </div>
        <Dropdown
          placeholder={'F.eks. Matematikk, naturfag eller norsk'}
          placeholderClassName={'dropdown-placeholder'}
          menuClassName={'dropdown-placeholder'}
          options={subjects}
          value={subject.value}
          onChange={setSubject}
        />
        {subject.value && (
          <div>
            <div
              className="sectioncontainer--form--header"
              id="leksehjelp--form--header"
            >
              Velg klassetrinn <span className="error-message">*</span>
            </div>
            <Dropdown
              className="dropdown"
              placeholder={'F.eks. 9. klasse, 10. klasse eller Vg 1'}
              placeholderClassName={'dropdown-placeholder'}
              menuClassName={'dropdown-placeholder'}
              options={GRADE_OPTIONS}
              value={grade.value}
              onChange={setGrade}
            />
          </div>
        )}
        {subjectStatusMessage && (
          <p className="sectioncontainer--text">{subjectStatusMessage}</p>
        )}
      </form>
      {isLeksehjelpOpen && (
        <>
          <button
            className="btn btn-submit"
            disabled={
              /*!statusActive || TODO: uncomment in prod*/
              subject.value === '' ||
              grade.value === '' ||
              inQueue ||
              !isActiveSubject(subject.label)
            }
            onClick={() => enterChatQueue(CHAT_TYPES.LEKSEHJELP_TEXT)}
          >
            Chat
          </button>{' '}
          <button
            className="btn btn-submit btn-right"
            disabled={
              /*!statusActive || TODO: uncomment in prod*/
              subject.value === '' ||
              grade.value === '' ||
              inQueue ||
              !isActiveSubject(subject.label)
            }
            onClick={() => enterChatQueue(CHAT_TYPES.LEKSEHJELP_VIDEO)}
          >
            Videochat
          </button>
        </>
      )}
    </div>
  );
};

export default withRouter(SectionLeksehjelp);
