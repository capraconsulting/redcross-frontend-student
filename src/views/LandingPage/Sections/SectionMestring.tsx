import React from 'react';
import Dropdown from 'react-dropdown';
import { withRouter, RouteComponentProps } from 'react-router';
// Styes
import '../../../styles/LandingPage.less';

const SectionMestring = (props: RouteComponentProps) => {
  const { history } = props;
  const textChat = false;
  const videoChat = false;
  return (
    <div className="help">
      <div>
        <div className="mestring">
          <div className="mestring--badge_new">Ny tjeneste!</div>
          <a
            onClick={() => history.push(`mestring`)}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="mestring--header">
              Mestring, motivasjon og veiledning
            </div>
          </a>
          <p className="sectioncontainer--text">
            Trenger du litt motivasjon? Har du fått eksamensnerver? Vil du prøve
            en ny lesestrategi?
          </p>
          <p className="sectioncontainer--text">
            Snakk med en av våre frivillige, enten via chat eller på
            videosamtale!
          </p>
          <form className="mestring--form">
            <div className="mestring--form--header">Velg tema</div>
            <Dropdown
              options={[]}
              placeholder="F.eks motivasjon, læringsmetoder"
            />
          </form>
          <button
            className="btn btn-submit"
            disabled={!textChat}
            onClick={() => history.push('mestring')}
          >
            Chat
          </button>{' '}
          eller{' '}
          <button
            className="btn btn-submit"
            disabled={!videoChat}
            onClick={() => history.push('mestring')}
          >
            Videchat
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
