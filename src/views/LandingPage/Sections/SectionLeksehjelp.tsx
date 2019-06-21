import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';

//Styles
import '../../../styles/LandingPage.less';

//Interfaces
import { ICourse, IStatus } from '../../../interfaces';

//Services
import { getCourseList, getCourseStatus } from '../../../services/api-service';

const SectionLeksehjelp = () => {
  const [courses, setCourses] = useState([] as ICourse[]);
  const [courseStatus, setCourseStatus] = useState([] as IStatus[]);
  const [formControls, setFormControls] = useState({
    value: '',
    label: '',
  });

  useEffect(() => {
    getCourseList().then(setCourses);
  }, []);

  const getCourseOptions = (): Option[] => {
    let courseOptions: Option[] = [];
    courses.map(course => {
      courseOptions.push({ value: course.id.toString(), label: course.name });
    });
    return courseOptions;
  };
  const handleChange = async event => {
    let { label, value } = event;
    await setFormControls({ label, value });
    getCourseStatus(value).then(setCourseStatus);
  };

  //Rendering course availability based on employee time schedule
  const renderStatusMessage = () => {
    if (courseStatus.length === 0 && formControls.value) {
      return (
        <p className="sectioncontainer--text">
          {formControls.label +
            ' er dessverre ikke tilgjengelig med det første.'}
        </p>
      );
    } else if (courseStatus.length > 0) {
      return courseStatus.map((s, index) => {
        return (
          <p className="sectioncontainer--text" key={index}>
            {s.day + ' ' + s.start + '-' + s.end}
          </p>
        );
      });
    }
  };

  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Leksehjelp</div>
      <p className="sectioncontainer--text" id="leksehjelpcontainer--text">
        Få{' '}
        <a href="/leksehjelp" className="sectioncontainer--text--colored">
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
          options={getCourseOptions()}
          value={formControls.value}
          onChange={event => handleChange(event)}
        />
        {renderStatusMessage()}
      </form>
    </div>
  );
};

export default SectionLeksehjelp;
