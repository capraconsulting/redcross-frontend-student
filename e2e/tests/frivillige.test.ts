import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture`Digital Leksehjelp`
  .page('http://localhost:3000/frivillige')
  .beforeEach(async () => {
    await waitForReact();
  });

//Skipping all tests in selected fixture
//fixture.skip`Digital Leksehjelp`;

class LandingPage {
  //Declaring selector type for each element to test
  public frivilligText: Selector;

  //Constructing elements to test
  public constructor() {
    this.frivilligText = ReactSelector('p').withProps({
      id: 'volunteer--text',
    });
  }

  //Arrow functions fetching the selectors text content.
  public getText = key => this[key].textContent;
}

// Constructiong the landing page referance
const landingPage = new LandingPage();

//Test header text value
test('Check SectionInfo description', async t => {
  await t
    .expect(landingPage.getText('frivilligText'))
    .eql(
      'På samme måte som de fleste andre aktiviteter i Røde Kors, er Digital Leksehjelp drevet av frivillige. Våre frivillige er trygge voksenpersoner som bruker sine fagkunnskaper og sitt engasjement til å støtte elever med skolearbeidet, og å legge til rette for mestring, motivasjon og lærelyst. Digital Leksehjelp er en trygg digital plattform som bygger på Røde Kors-prinsippene humanitet, upartiskhet, nøytralitet, uavhengighet, frivillighet, enhet og universalitet. Les mer om prinsippene her. Vi har omlag 60 aktive frivillige, fordelt på kontorer tilknyttet Oslo, Bergen og Stavanger Røde Kors. Våre frivillige har gjennomført et obligatorisk introduksjonskurs til Røde Kors og et obligatorisk grunnkurs i leksehjelp og pedagogikk. De får kontinuerlig oppfølging og veiledning på vakt.',
    );
});
