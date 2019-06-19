import { NorwegianDate } from './date-service';

const dateformat = {
  in: '2019-12-06 00:00:00.0',
  out: '6.12.2019',
};

describe('questionDate-pipe-service', () => {
  it('should return questionDate formatted to norwegian questionDate format', () => {
    expect(NorwegianDate(dateformat.in)).toMatch(dateformat.out);
  });
});
