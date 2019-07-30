import React, { useState, useEffect, useContext } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { withRouter, RouteComponentProps } from 'react-router';

//Styles
import '../../../styles/LandingPage.less';

//Interfaces
import { ISubject } from '../../../interfaces';

//Services
import {
  getSubjectList,
  getSubjectStatus,
} from '../../../services/api-service';
import { SocketContext } from '../../../providers';
import { QueueMessageBuilder } from '../../../services/message-service';
import { CHAT_TYPES, MESSAGE_TYPES } from '../../../../config';

const SectionLeksehjelp = (props: RouteComponentProps) => {
  const { history } = props;
  const { uniqueID, socketSend } = useContext(SocketContext);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [statusActive, setStatusActive] = useState<boolean>(false);
  const [formControls, setFormControls] = useState({
    value: '',
    label: '',
  });

  useEffect(() => {
    try {
      getSubjectList('?isMestring=0').then(setSubjects);
    } catch (e) {}
  }, []);

  const getSubjectOptions = (): Option[] => {
    let subjectOptions: Option[] = [];
    subjects &&
      subjects.map(subject => {
        subjectOptions.push({
          value: subject.id.toString(),
          label: subject.subjectTitle,
        });
      });
    return subjectOptions;
  };

  //statusMap keys, used for indexing of the Map with seven bit arrays in handleStatus().
  const weekDays = [
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
    'Søndag',
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
              setStatusActive(true);
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
    for (var i = 0; i < 7; i++) {
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

  const handleChange = async event => {
    let { label, value } = event;
    await setFormControls({ label, value });
    getSubjectStatus(value).then(res => handleStatus(res));
  };

  //Rendering subject availability based on employee time schedule (recieved time slots)
  const renderStatusMessage = () => {
    if (timeSlots && timeSlots.length === 0 && formControls.value) {
      return (
        <p className="sectioncontainer--text">
          {formControls.label +
            ' er dessverre ikke tilgjengelig med det første.'}
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
    }
  };

  const enterChatQueue = (chatType: string) => {
    const msg = new QueueMessageBuilder(MESSAGE_TYPES.ENTER_QUEUE)
      .withCourse(formControls.label)
      .withUniqueID(uniqueID)
      .withChatType(chatType)
      .build();
    socketSend(msg.createMessage);
    history.push('leksehjelp');
  };

  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Leksehjelp</div>
      <p className="sectioncontainer--text" id="leksehjelpcontainer--text">
        Få hjelp av en frivillig til å løse oppgaver, diskutere et tema, skrive
        tekster eller øve til prøver.
      </p>
      <form className="sectioncontainer--form">
        <div
          className="sectioncontainer--form--header"
          id="leksehjelp--form--header"
        >
          Velg tema
        </div>
        <Dropdown
          placeholder={'F.eks. Matematikk, naturfag eller norsk'}
          options={getSubjectOptions()}
          value={formControls.value}
          onChange={event => handleChange(event)}
        />
        {renderStatusMessage()}
      </form>
      <button
        className="btn btn-submit"
        /*disabled={!statusActive || formControls.value === ''}*/
        onClick={() => enterChatQueue(CHAT_TYPES.LEKSEHJELP_TEXT)}
      >
        Chat
      </button>{' '}
      eller{' '}
      <button
        className="btn btn-submit"
        /*disabled={!statusActive || formControls.value === ''}*/
        onClick={() => enterChatQueue(CHAT_TYPES.LEKSEHJELP_VIDEO)}
      >
        Videochat
      </button>
    </div>
  );
};

export default withRouter(SectionLeksehjelp);
