import React from 'react';

//Styles
import '../../../styles/LandingPage.less';

const SectionInfo = () => {
  return (
    <div className="volunteersPage--section">
      <div className="volunteersPage--section--div">
        <div className="volunteer--header">Våre frivillige</div>
        <p className="volunteer--text">
          På samme måte som de fleste andre aktiviteter i Røde Kors, er Digital
          Leksehjelp drevet av frivillige. Våre frivillige er trygge
          voksenpersoner som bruker sine fagkunnskaper og sitt engasjement til å
          støtte elever med skolearbeidet, og å legge til rette for mestring,
          motivasjon og lærelyst.
        </p>
        <p className="volunteer--text">
          Digital Leksehjelp er en trygg digital plattform som bygger på Røde
          Kors-prinsippene humanitet, upartiskhet, nøytralitet, uavhengighet,
          frivillighet, enhet og universalitet. Les mer om prinsippene{' '}
          <a
            href="https://www.rodekors.no/om/bevegelsen/"
            className="volunteer--text--colored"
            target="_blank"
            rel="noopener noreferrer"
          >
            her
          </a>
          {'. '}
        </p>
        <p className="volunteer--text">
          Vi har omlag 60 aktive frivillige, fordelt på kontorer tilknyttet
          Oslo, Bergen og Stavanger Røde Kors. Våre frivillige har gjennomført
          et obligatorisk introduksjonskurs til Røde Kors og et obligatorisk
          grunnkurs i leksehjelp og pedagogikk. De får kontinuerlig oppfølging
          og veiledning på vakt.
        </p>
      </div>
      <div className="volunteersPage--section--img">
        <img
          src={require('../../../assets/images/volunteers_2.png')}
          className="volunteer--image--content"
          alt="frivillig"
        />
      </div>
    </div>
  );
};

export default SectionInfo;
