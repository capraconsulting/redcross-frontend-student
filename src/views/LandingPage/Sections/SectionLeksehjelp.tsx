import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';

import '../../../styles/LandingPage.less';
import { ICourse, IStatus } from '../../../interfaces';
import { getCourseList, getCourseStatus } from '../../../services/api-service';

const SectionLeksehjelp = () => {
  const [courses, setCourses] = useState([] as ICourse[]);
  const [courseStatus, setCourseStatus] = useState([] as IStatus[]);
  const [courseStatusMessage, setCourseStatusMessage] = useState('' as string);
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
    setFormControls({ label, value });

    let courseStatus = await getCourseStatus(value);
    await setCourseStatus(courseStatus);
    console.log(courseStatus);
  };

  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Leksehjelp</div>
      <p className="sectioncontainer--text" id="container--text">
        Få{' '}
        <a href="/leksehjelp" className="sectioncontainer--text--colored">
          gratis leksehjelp
        </a>{' '}
        over chat eller video av våre frivillige!{' '}
      </p>
      <form className="sectioncontainer--form">
        <div className="sectioncontainer--form--header">
          Se når ditt fag er tilgjengelig
        </div>
        <Dropdown
          placeholder={'F.eks. Matematikk, naturfag eller norsk'}
          options={getCourseOptions()}
          value={formControls.value}
          onChange={event => handleChange(event)}
        />
        <p className="sectioncontainer--text">
          {courseStatus.length === 0 &&
            formControls.value &&
            formControls.label +
              ' er dessverre ikke tilgjengelig med det første'}
          {courseStatusMessage}
        </p>
      </form>
    </div>
  );
};

export default SectionLeksehjelp;
