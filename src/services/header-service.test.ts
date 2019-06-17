import getHeader from './header-service';

describe('header-service', () => {
  it('should return a message containing app name', () => {
    expect(getHeader('Digital Leksehjelp')).toMatch('Digital Leksehjelp');
  });
});
