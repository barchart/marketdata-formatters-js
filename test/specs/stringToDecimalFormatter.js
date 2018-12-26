let stringToDecimalFormatter = require('../../lib/stringToDecimalFormatter');

describe('when parsing prices', () => {
	'use strict';

	describe('with a fractional separator', () => {
		it('returns 125.625 (with unit code 2) when parsing "125-5"', () => {
			expect(stringToDecimalFormatter('125-5', '2')).toEqual(125.625);
		});

		it('returns 125.625 (with unit code 5) when parsing "125-240"', () => {
			expect(stringToDecimalFormatter('125-240', '5')).toEqual(125.75);
		});
	})
});
