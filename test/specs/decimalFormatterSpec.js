var decimalFormatter = require('../../lib/decimalFormatter');

describe('when using the "decimal" formatter with zero decimals and no thousands separator', function() {
	it('formats 377 as "377"', function() {
		expect(decimalFormatter(377, 0, ',')).toEqual('377');
	});

	it('formats 377.99 as "378"', function() {
		expect(decimalFormatter(377.99, 0, ',')).toEqual('378');
	});

	it('formats 377.49 as "378"', function() {
		expect(decimalFormatter(377.49, 0, ',')).toEqual('377');
	});

	it('formats 377377 as "377,377"', function() {
		expect(decimalFormatter(377377, 0, ',')).toEqual('377,377');
	});

	it('formats 377377.49 as "377,377"', function() {
		expect(decimalFormatter(377377.49, 0, ',')).toEqual('377,377');
	});

	it('formats 377377.99 as "377,378"', function() {
		expect(decimalFormatter(377377.99, 0, ',')).toEqual('377,378');
	});
});