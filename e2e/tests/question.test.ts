import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture`Digital Leksehjelp`
  .page('http://localhost:3000/questions/1')
  .beforeEach(async () => {
    await waitForReact();
  });

class LandingPage {
  //Declaring selector type for each element to test
  public answer: Selector;
  public question: Selector;

  //Constructing elements to test
  public constructor() {
    this.answer = ReactSelector('p').withProps({ id: 'showAnswer--info' });
    this.question = ReactSelector('p').withProps({ id: 'singleQuestion' });
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

test('Check question description', async t => {
  await t
    .expect(landingPage.getText('question'))
    .eql(
      'Hei, jeg har kommet opp i skriftlig engelsk eksamen og lurte på om dere har noen tips til meg om hvorfdan jeg bør foreberede meg. Jeg ligger på en 4 og vil veldig gjerne ha en 5-6 på eksamen. Nå har jeg to uker på meg for å forberede meg. Læreren min kommenterer på gamle innleveringer at jeg må øve mer på verb i entall og flertall. Og at jeg må ha er større ordforråd, tekstene min kommuniserer greit og at jeg nå ha sterkere argumenter. Hvordan kan jeg øve på dette?',
    );
});
