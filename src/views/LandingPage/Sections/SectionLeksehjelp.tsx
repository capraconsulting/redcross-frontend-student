import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { withRouter, RouteComponentProps } from 'react-router';

//Styles
import '../../../styles/LandingPage.less';

//Interfaces
import { ISubject, IStatus } from '../../../interfaces';

//Services
import {
  getSubjectList,
  getSubjectStatus,
} from '../../../services/api-service';

const SectionLeksehjelp = (props: RouteComponentProps) => {
  const { history } = props;
  const [subjects, setSubjects] = useState([] as ISubject[]);
  const [subjectStatus, setSubjectStatus] = useState([] as IStatus[]);
  const [formControls, setFormControls] = useState({
    value: '',
    label: '',
  });

  useEffect(() => {
    try {
      getSubjectList().then(setSubjects);
    } catch (e) {
      console.log(e);
    }
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
  const handleChange = async event => {
    let { label, value } = event;
    await setFormControls({ label, value });
    /** 
    Activate this request when questions/status endpoint is created
    getSubjectStatus(value).then(setSubjectStatus);
    */
  };

  //Rendering subject availability based on employee time schedule
  const renderStatusMessage = () => {
    if (subjectStatus.length === 0 && formControls.value) {
      return (
        <p className="sectioncontainer--text">
          {formControls.label +
            ' er dessverre ikke tilgjengelig med det første.'}
        </p>
      );
    } else if (subjectStatus.length > 0) {
      return subjectStatus.map((status, index) => {
        return (
          <p className="sectioncontainer--text" key={index}>
            {status.day + ' ' + status.start + '-' + status.end}
          </p>
        );
      });
    }
  };

  const textChat = true;
  const videoChat = true;

  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Leksehjelp</div>
      <p className="sectioncontainer--text" id="leksehjelpcontainer--text">
        Få{' '}
        <a
          onClick={() => history.push('leksehjelp')}
          className="sectioncontainer--text--colored"
        >
          gratis leksehjelp
        </a>{' '}
        over chat eller video av våre frivillige!
      </p>
      <form className="sectioncontainer--form">
        <div
          className="sectioncontainer--form--header"
          id="leksehjelp--form--header"
        >
          Se når ditt fag er tilgjengelig
        </div>
        <Dropdown
          placeholder={'F.eks. Matematikk, naturfag eller norsk'}
          options={getSubjectOptions()}
          value={formControls.value}
          onChange={event => handleChange(event)}
        />
        <button className="btn btn-submit" disabled={!textChat}>
          Chat
        </button>{' '}
        eller{' '}
        <button className="btn btn-submit" disabled={!videoChat}>
          Videchat
        </button>
        {renderStatusMessage()}
      </form>
    </div>
  );
};

export default withRouter(SectionLeksehjelp);
