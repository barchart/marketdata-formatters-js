var stringToDecimalFormatter = require('../../lib/stringToDecimalFormatter');

describe('when parsing prices', function() {
	'use strict';

	describe('with a fractional separator', function() {
		it('returns 125.625 (with unit code 2) when parsing "125-5"', function() {
			expect(stringToDecimalFormatter('125-5', '2')).toEqual(125.625);
		});

		it('returns 125.625 (with unit code 5) when parsing "125-240"', function() {
			expect(stringToDecimalFormatter('125-240', '5')).toEqual(125.75);
		});
	})
});
