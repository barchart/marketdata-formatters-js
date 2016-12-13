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

describe('When getting a producer symbol', function() {
	it('TSLA should map to TSLA', function() {
		expect(symbolParser.getProducerSymbol('TSLA')).toEqual('TSLA');
	});

	it('TSLA.BZ should map to TSLA.BZ', function() {
		expect(symbolParser.getProducerSymbol('TSLA.BZ')).toEqual('TSLA.BZ');
	});

	it('ESZ6 should map to ESZ6', function() {
		expect(symbolParser.getProducerSymbol('ESZ6')).toEqual('ESZ6');
	});

	it('ESZ16 should map to ESZ6', function() {
		expect(symbolParser.getProducerSymbol('ESZ16')).toEqual('ESZ6');
	});

	it('ESZ2016 should map to ESZ6', function() {
		expect(symbolParser.getProducerSymbol('ESZ16')).toEqual('ESZ6');
	});

	it('ES*0 should map to ES*0', function() {
		expect(symbolParser.getProducerSymbol('ES*0')).toEqual('ES*0');
	});

	it('$DOWI should map to $DOWI', function() {
		expect(symbolParser.getProducerSymbol('$DOWI')).toEqual('$DOWI');
	});

	it('^EURUSD should map to ^EURUSD', function() {
		expect(symbolParser.getProducerSymbol('^EURUSD')).toEqual('^EURUSD');
	});
});