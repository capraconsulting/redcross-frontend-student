import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture`QAPage`.page('http://localhost:3000/questions').beforeEach(async () => {
  await waitForReact();
});

//Skipping all tests in selected fixture
//fixture.skip`QuestionPage`;

class LandingPage {
  //Declaring selector msgType for each element to test
  public searchFormHeader: Selector;

  //Constructing elements to test
  public constructor() {
    this.searchFormHeader = ReactSelector('h1').withProps({
      id: 'QAsearchForm--header',
    });
  }

  //Fetching the selectors text content.
  public getText = key => this[key].textContent;
}

// Constructiong the landing page referance
const landingPage = new LandingPage();

test('Check QA search form header text', async t => {
  await t
    .expect(landingPage.getText('searchFormHeader'))
    .eql('Søk blant spørsmål');
});
