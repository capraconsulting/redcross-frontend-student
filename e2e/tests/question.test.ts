import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture`Digital Leksehjelp`
  .page('http://localhost:3000/questions/1')
  .beforeEach(async () => {
    await waitForReact();
  });

//Skipping all tests in selected fixture
//fixture.skip`Digital Leksehjelp`;

class LandingPage {
  //Declaring selector type for each element to test
  public answer: Selector;

  //Constructing elements to test
  public constructor() {
    this.answer = ReactSelector('p').withProps({ id: 'showAnswer--info' });
  }

  //Arrow functions fetching the selectors text content.
  public getText = key => this[key].textContent;
}

// Constructiong the landing page referance
const landingPage = new LandingPage();

//Test header text value
test('Check answer headline', async t => {
  await t
    .expect(landingPage.getText('answer'))
    .eql('Svaret er skrevet av en frivillig hos Digital Leksehjelp.');
});
