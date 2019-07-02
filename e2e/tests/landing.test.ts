import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture`Digital Leksehjelp`
  .page('http://localhost:3000')
  .beforeEach(async () => {
    await waitForReact();
  });

//Skipping all tests in selected fixture
//fixture.skip`Digital Leksehjelp`;

class LandingPage {
  //Declaring selector type for each element to test
  public headline: Selector;
  public footer: Selector;
  public QA: Selector;
  public leksehjelp: Selector;
  public frivillig: Selector;

  //Constructing elements to test
  public constructor() {
    this.headline = ReactSelector('span').withProps({ id: 'header--logo' });
    this.QA = ReactSelector('p').withProps({ id: 'sectionquestions--text' });
    this.footer = ReactSelector('h1').withProps({ id: 'footer--content' });
    this.leksehjelp = ReactSelector('p').withProps({
      id: 'leksehjelpcontainer--text',
    });
    this.frivillig = ReactSelector('p').withProps({
      id: 'sectionVolunteer--text',
    });
  }

  //Arrow functions fetching the selectors text content.
  public getText = key => this[key].textContent;
}

// Constructiong the landing page referance
const landingPage = new LandingPage();
console.log(landingPage.footer.length);
//Test header text value
test('Check header', async t => {
  await t.expect(landingPage.getText('headline')).eql('Digital Leksehjelp');
});

//Test leksehjelp section text value
test('Check leksehjelp section description', async t => {
  await t
    .expect(landingPage.getText('leksehjelp'))
    .eql(
      'Få hjelp av en frivillig til å løse oppgaver, diskutere et tema, skrive tekster eller øve til prøver.',
    );
});

//Test hero section text value
test('Check QA section description', async t => {
  await t
    .expect(landingPage.getText('QA'))
    .eql(
      'Her kan du lete etter svar blant allerede stilte spørsmål, eller stille et nytt spørsmål hvis du ikke finner det du lurer på!',
    );
});

//Test footer text value
test('Check footer facebook link', async t => {
  await t.expect(landingPage.getText('footer')).eql('Følg oss på Facebook');
});

test('Check frivillig section description', async t => {
  await t
    .expect(landingPage.getText('frivillig'))
    .eql(
      'På samme måte som de fleste andre aktiviteter i Røde Kors, er Digital Leksehjelp drevet av frivillige. Våre frivillige er trygge voksenpersoner som bruker sine fagkunnskaper og sitt engasjement til å gjøre elevers skolehverdag bedre og legge til rette for mestring, motivasjon og lærelyst. ',
    );
});
