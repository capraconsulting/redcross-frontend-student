import React from 'react';

//Styles
import '../../../styles/LandingPage.less';

const SectionRecruiting = () => {
  return (
    <div className="volunteersPage--section">
      <div className="volunteersPage--section--div">
        <img
          src={require('../../../assets/images/volunteers_3.jpg')}
          className="volunteer--image--content"
          alt="frivillig"
        ></img>
      </div>
      <div className="volunteersPage--section--div">
        <div className="volunteer--header">Våre frivillige</div>
        <p className="volunteer--text" id="volunteer--text">
          Vi trenger stadig nye frivillige med ulik bakgrunn. Du trenger ikke
          være ekspert, men en som er glad i fag, og som liker å formidle,
          motivere og veilede. Har du lyst til å bidra, les mer og meld deg som
          frivillig på{' '}
          <a
            href="https://www.rodekors.no"
            className="volunteer--text--colored"
          >
            www.rodekors.no
          </a>
        </p>
        <div className="listHeader">Kriterier</div>
        <ul>
          <li>Du er over 20 år</li>
          <li>
            Har påbegynt høyere utdanning (høyskole, fagskole, universitet)
          </li>
          <li>Begrenset politiattest</li>
          <li>Gjennomfører obligatoriske kurs i regi av Røde Kors</li>
          <li>Møter opp fast 2 timer i uken</li>
          <li>
            Forplikter deg til å være aktiv frivillig i Digital Leksehjelp i
            minst ett år.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionRecruiting;
