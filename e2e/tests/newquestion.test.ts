import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture`NewQuestionPage`
  .page('http://localhost:3000/questions/new')
  .beforeEach(async () => {
    await waitForReact();
  });

//Skipping all tests in selected fixture
//fixture.skip`QuestionPage`;

class LandingPage {
  //Declaring selector type for each element to test
  public newQuestionText: Selector;

  //Constructing elements to test
  public constructor() {
    this.newQuestionText = ReactSelector('p').withProps({
      id: 'NewQuestion--text',
    });
  }

  //Fetching the selectors text content.
  public getText = key => this[key].textContent;
}

// Constructiong the landing page referance
const landingPage = new LandingPage();

test('Check NewQuestionPage description text', async t => {
  await t
    .expect(landingPage.getText('newQuestionText'))
    .eql(
      'Still et spørsmål, eller send oss en oppgave eller tekst som du vil at vi skal ta en kikk på. Det er helt anonymt og vi får ikke vite hvem du er. Det tar vanligvis mellom 2-3 dager å få svar.',
    );
});
