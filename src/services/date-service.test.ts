import { NorwegianDate } from '../src/services/date-service';

const dateformat = {
  in: '2019-12-06 00:00:00.0',
  out: '6.12.2019',
};

describe('date-pipe-service', () => {
  it('should return date formatted to norwegian date format', () => {
    expect(NorwegianDate(dateformat.in)).toMatch(dateformat.out);
  });
});
