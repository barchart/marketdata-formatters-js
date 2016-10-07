var symbolParser = require('../../lib/symbolParser');

describe('When checking the display format for the symbol "HPIUSA.RP"', function() {
	it('it should not be formatted as a percent', function() {
		expect(symbolParser.displayUsingPercent('HPIUSA.RP')).toEqual(false);
	});
});

describe('When checking the display format for the symbol "UERMNTUS.RT"', function() {
	it('it should be formatted as a percent', function() {
		expect(symbolParser.displayUsingPercent('UERMNTUS.RT')).toEqual(true);
	});
});