import getHeader from './header-service';

describe('header-service', () => {
  it('should return a message containing app theme', () => {
    expect(getHeader('Digital Leksehjelp')).toMatch('Digital Leksehjelp');
  });
});
