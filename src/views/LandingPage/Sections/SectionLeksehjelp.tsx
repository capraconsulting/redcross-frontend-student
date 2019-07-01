import React, { useState, useEffect } from 'react';
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

const SectionLeksehjelp = (props: RouteComponentProps) => {
  const { history } = props;
  const [subjects, setSubjects] = useState([] as ISubject[]);
  const [timeSlots, setTimeSlots] = useState([] as string[]);
  const [statusActive, setStatusActive] = useState(false);
  const [formControls, setFormControls] = useState({
    value: '',
    label: '',
  });

  useEffect(() => {
    try {
      getSubjectList().then(setSubjects);
    } catch (e) {}
  }, []);

  const getSubjectOptions = (): Option[] => {
    let subjectOptions: Option[] = [];
    subjects &&
      subjects.map(subject => {
        subjectOptions.push({
          value: subject.id.toString(),
          label: subject.subject,
        });
      });
    return subjectOptions;
  };

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
    statusMap.forEach((timeTable, key) => {
      let start = 0;
      let end = 0;
      timeTable.map((timeSlot, index) => {
        if (timeSlot === 1) {
          end = index;
        } else {
          if (end > start) {
            let startDate = new Date(
              start * 60000 - 60 * 6 * 10000 + 6 * 10000,
            );
            let endDate = new Date(end * 60000 - 60 * 6 * 10000 + 6 * 10000);
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
            if (
              Number(now.getTime()) >= Number(before.getTime()) &&
              Number(now.getTime()) <= Number(after.getTime())
            ) {
              setStatusActive(true);
            }
          }
          start = index;
        }
      });
    });
    setTimeSlots(tempTimeSlots);
  };

  const handleStatus = async subjectStatus => {
    let statusMap = new Map();
    for (var i = 0; i < 7; i++) {
      statusMap.set(weekDays[i], new Array(1560).fill(0));
    }
    await subjectStatus.map(status => {
      let { from, to, day } = status;
      let fromList = from.split(':');
      let toList = to.split(':');
      let fromMinutes = Number(fromList[0]) * 60 + Number(fromList[1]);
      let toMinutes = Number(toList[0]) * 60 + Number(toList[1]);
      statusMap.get(weekDays[day]).fill(1, fromMinutes, toMinutes);
    });
    getTimes(statusMap);
  };

  const handleChange = async event => {
    let { label, value } = event;
    await setFormControls({ label, value });
    getSubjectStatus(value).then(res => handleStatus(res));
  };

  //Rendering subject availability based on employee time schedule
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

  //Set the status from request subjectStatus
  const textChat = true;
  const videoChat = false;

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
        disabled={!statusActive || formControls.value === ''}
        onClick={() => history.push('leksehjelp')}
      >
        Chat
      </button>{' '}
      eller{' '}
      <button
        className="btn btn-submit"
        disabled={!statusActive || formControls.value === ''}
        onClick={() => history.push('leksehjelp')}
      >
        Videchat
      </button>
    </div>
  );
};

export default withRouter(SectionLeksehjelp);
