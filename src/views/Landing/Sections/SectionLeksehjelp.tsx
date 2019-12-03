import React, { useState, useEffect, useContext, useMemo } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { withRouter, RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Styles
import '../../../styles/LandingPage.less';

//Interfaces
import { IQueueMessage, ISubject } from '../../../interfaces';

//Services
import {
  getIsLeksehjelpOpen,
  getSubjectList,
  getSubjectStatus,
} from '../../../services/api-service';
import { QueueMessageBuilder } from '../../../services/message-service';

//Providers & reducers
import { SocketContext } from '../../../providers';
import { initStudentInfoAction } from '../../../reducers';

//Configurations
import { CHAT_TYPES, MESSAGE_TYPES } from '../../../../config';
import grades from '../../../grades';
import { useNextOpeningDay } from '../../../hooks/use-next-opening-day';

interface IProps extends RouteComponentProps {
  isLeksehjelpOpen: boolean;
}

const SectionLeksehjelp: React.FC<IProps> = ({ history, isLeksehjelpOpen }) => {
  const {
    uniqueID,
    socketSend,
    dispatchStudentInfo,
    inQueue,
    activeSubjects,
  } = useContext(SocketContext);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [statusActive, setStatusActive] = useState<boolean>(false);
  const [course, setCourse] = useState({
    value: '',
    label: '',
  });
  const [grade, setGrade] = useState({
    value: '',
    label: '',
  });

  useEffect(() => {
    try {
      getSubjectList('?isMestring=0').then(setSubjects);
    } catch (e) {}
  }, []);

  const getSubjectOptions = (): Option[] => {
    return (subjects || [])
      .map(subject => ({
        value: subject.id.toString(),
        label: subject.subjectTitle,
      }))
      .sort((s1, s2) => {
        if (
          activeSubjects.includes(s1.label) &&
          !activeSubjects.includes(s2.label)
        ) {
          return 1;
        }

        if (
          activeSubjects.includes(s2.label) &&
          !activeSubjects.includes(s1.label)
        ) {
          return -1;
        }

        return 0;
      });
  };

  const getGradeOptions = (): Option[] => {
    return grades.map(grade => ({
      value: grade.gradeID,
      label: grade.label,
    }));
  };

  //statusMap keys, used for indexing of the Map with seven bit arrays in handleStatus().
  const weekDays = [
    'Søndag',
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
  ];

  const getTimes = statusMap => {
    let tempTimeSlots = [] as string[];
    //Loop over the seven bitmaps (one per day) in the filled statusMaps.
    statusMap.forEach((timeTable, key) => {
      let start = 0;
      let end = 0;
      timeTable.map((timeSlot, index) => {
        //Checks if bit is filled, and sets it as new interval end.
        if (timeSlot === 1) {
          end = index;
        } else {
          //Complete intervall.
          if (end > start) {
            let startDate = new Date(
              start * 60000 - 60 * 6 * 10000 + 6 * 10000,
            );
            let endDate = new Date(end * 60000 - 60 * 6 * 10000 + 6 * 10000);
            //Push time string to timeslots list.
            tempTimeSlots.push(
              key +
                ' ' +
                startDate.getHours() +
                ':' +
                (startDate.getMinutes() < 10
                  ? '0' + startDate.getMinutes()
                  : startDate.getMinutes()) +
                '-' +
                endDate.getHours() +
                ':' +
                (endDate.getMinutes() < 10
                  ? '0' + endDate.getMinutes()
                  : endDate.getMinutes()),
            );
            //Create dates to compare current time and subjects active periodes.
            let now = new Date();
            let before = new Date();
            before.setHours(
              startDate.getHours(),
              startDate.getMinutes(),
              startDate.getMinutes(),
            );
            let after = new Date();
            after.setHours(
              endDate.getHours(),
              endDate.getMinutes(),
              endDate.getSeconds(),
            );
            //Checks if current day and time is within a interval
            if (
              Number(now.getTime()) >= Number(before.getTime()) &&
              Number(now.getTime()) <= Number(after.getTime()) &&
              weekDays[now.getDay() - 1] === key
            ) {
              //Enables chat and videochat button for current subject
              getIsLeksehjelpOpen().then(data => {
                setStatusActive(data.isopen);
              });
            }
          }
          start = index;
        }
      });
    });
    //Looped over each day and created status messages, then sets the here state to render them.
    setTimeSlots(tempTimeSlots);
  };

  const handleStatus = async subjectStatus => {
    let statusMap = new Map();
    //Creates bit map for each day in the week, 1560 minutes per day.
    for (let i = 0; i < 7; i++) {
      statusMap.set(weekDays[i], new Array(1560).fill(0));
    }
    //Loop the timeslots recieved from backend
    await subjectStatus.map(status => {
      let { from, to, day } = status;
      let fromList = from.split(':');
      let toList = to.split(':');
      //Lower timeslot boundery in minutes
      let fromMinutes = Number(fromList[0]) * 60 + Number(fromList[1]);
      //Upper timeslot boundary in minutes
      let toMinutes = Number(toList[0]) * 60 + Number(toList[1]);
      //Fill the bitmap with 1s to cover the timeslots of 'Mandag' (day=0) to 'Søndag' (day=6).
      statusMap.get(weekDays[day]).fill(1, fromMinutes, toMinutes);
    });
    //Get time strings (solves timeslot overlaps).
    getTimes(statusMap);
  };

  const handleChange = async (event, type: string) => {
    let { label, value } = event;
    switch (type) {
      case 'course':
        setCourse({
          label,
          value,
        });
        getSubjectStatus(value).then(handleStatus);
        break;
      case 'grade':
        setGrade({
          label,
          value,
        });
        break;
    }
  };

  const isActiveSubject = (subject: string): boolean => {
    return activeSubjects.indexOf(subject) >= 0;
  };

  //Rendering subject availability based on employee time schedule (recieved time slots)
  const renderStatusMessage = () => {
    if (course.label && isActiveSubject(course.label) && isLeksehjelpOpen) {
      return (
        <p className="sectioncontainer--text">
          {course.label} er tilgjengelig.
        </p>
      );
    } else if (
      course.label &&
      !isActiveSubject(course.label) &&
      isLeksehjelpOpen
    ) {
      return (
        <p className="sectioncontainer--text">
          Det er dessverre ingen som kan hjelpe deg med{' '}
          {course.label.toLowerCase()} nå.
        </p>
      );
    }
    // TODO: Use this when time schedule is implemented, and remove the logic above:
    /*if (timeSlots && timeSlots.length === 0 && course.value) {
      return (
        <p className="sectioncontainer--text">
          {course.label + ' er dessverre ikke tilgjengelig med det første.'}
        </p>
      );
    } else if (timeSlots && timeSlots.length > 0) {
      return timeSlots.map((status, index) => {
        return (
          <p className="sectioncontainer--text" key={index}>
            {status}
          </p>
        );
      });
    }*/
  };

  const enterChatQueue = (chatType: string) => {
    getIsLeksehjelpOpen().then(data => {
      if (data.isopen) {
        const msg = new QueueMessageBuilder(MESSAGE_TYPES.ENTER_QUEUE)
          .withSubject(course.label)
          .withGrade(grade.label)
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

  const nextOpeningDay = useNextOpeningDay();

  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Leksehjelp</div>
      {isLeksehjelpOpen ? (
        <>
          <span className="sectioncontainer--header--status">
            åpen frem til kl. 21:00
          </span>
          <p className="sectioncontainer--text" id="leksehjelpcontainer--text">
            Få hjelp av en frivillig til å løse oppgaver, diskutere et tema,
            skrive tekster eller øve til prøver. Start en chat eller
            videosamtale!
          </p>
        </>
      ) : (
        <span className="sectioncontainer--header--status">
          åpner {nextOpeningDay} klokken 17:00
        </span>
      )}
      <form className="sectioncontainer--form">
        <div
          className="sectioncontainer--form--header"
          id="leksehjelp--form--header"
        >
          Velg tema <span className="error-message">*</span>
        </div>
        <Dropdown
          placeholder={'F.eks. Matematikk, naturfag eller norsk'}
          placeholderClassName={'dropdown-placeholder'}
          menuClassName={'dropdown-placeholder'}
          options={getSubjectOptions()}
          value={course.value}
          onChange={event => handleChange(event, 'course')}
        />
        {course.value && (
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
              options={getGradeOptions()}
              value={grade.value}
              onChange={event => handleChange(event, 'grade')}
            />
          </div>
        )}
        {renderStatusMessage()}
      </form>
      {isLeksehjelpOpen && (
        <>
          <button
            className="btn btn-submit"
            disabled={
              /*!statusActive || TODO: uncomment in prod*/
              course.value === '' ||
              grade.value === '' ||
              inQueue ||
              !isActiveSubject(course.label)
            }
            onClick={() => enterChatQueue(CHAT_TYPES.LEKSEHJELP_TEXT)}
          >
            Chat
          </button>{' '}
          <button
            className="btn btn-submit btn-right"
            disabled={
              /*!statusActive || TODO: uncomment in prod*/
              course.value === '' ||
              grade.value === '' ||
              inQueue ||
              !isActiveSubject(course.label)
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
