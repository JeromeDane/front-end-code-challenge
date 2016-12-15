require('chai').should();

describe('Front end challenge', () => {
  before(() => browser.url('/'));
  it('contains "Coding Challenge" and "Jerome Dane" in the title', () => {
    browser.getTitle().should.contain('Coding Challenge');
    browser.getTitle().should.contain('Jerome Dane');
  });
  describe('content', () => {
    it('main title has test "Super Hotel Search"', () =>
      $('.view-header h1').getText().should.equal('Super Hotel Search')
    );
  });
  describe('language selector', () => {
    it('starts off on English', () =>
      $('.view-locale-switcher select').getValue().should.equal('en')
    );
  })
  describe('search form', () => {
    describe('location input', () => {
      let locationInput;
      const assertInputPromptText = () => {
        locationInput.getCssProperty('font-style').value.should.equal('italic');
        locationInput.getCssProperty('color').value.should.equal('rgba(170,170,170,1)');
        locationInput.getValue().should.equal('Enter a city or zipcode');
      };
      before(() => {
        locationInput = $('.search-field-wrapper input.ui-autocomplete-input');
        locationInput.waitForExist();
      });
      it('has light gray, italic prompt text "Entar a city or zipcode"', assertInputPromptText);
      it('clears out prompt text when focused', () => {
        locationInput.click();
        locationInput.getValue().should.be.empty;
      });
      it('restores prompt when focus is lost and input has no value', () => {
        locationInput.setValue('');
        $('h1').click(); // to remove focus from input
        assertInputPromptText();
      });
    });
  });
});
