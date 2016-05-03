(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var lodashIsNaN = require('lodash.isnan');

module.exports = function() {
	'use strict';

	function frontPad(value, digits) {
		return ['000', Math.floor(value)].join('').substr(-1 * digits);
	}

	return function(fractionSeparator, specialFractions, thousandsSeparator) {
		var format;

		function getWholeNumberAsString(value) {
			var val = Math.floor(value);

			if ((val === 0) && (fractionSeparator === ''))
				return '';
			else
				return val;
		}

		function formatDecimal(value, digits) {
			var returnRef = value.toFixed(digits);

			if (thousandsSeparator && !(value < 1000)) {
				var length = returnRef.length;

				var found = digits === 0;
				var counter = 0;

				var buffer = [];

				for (var i = (length - 1); !(i < 0); i--) {
					if (counter === 3) {
						buffer.unshift(',');

						counter = 0;
					}

					var character = returnRef.charAt(i);

					buffer.unshift(character);

					if (found) {
						counter = counter + 1;
					} else if (character === '.') {
						found = true;
					}
				}

				returnRef = buffer.join('');
			}

			return returnRef;
		}

		if (fractionSeparator == '.') { // Decimals
			format = function(value, unitcode) {
				if (value === '' || value === undefined || value === null || lodashIsNaN(value))
					return '';

				switch (unitcode) {
					case '2':
						return formatDecimal(value, 3);
					case '3':
						return formatDecimal(value, 4);
					case '4':
						return formatDecimal(value, 5);
					case '5':
						return formatDecimal(value, 6);
					case '6':
						return formatDecimal(value, 7);
					case '7':
						return formatDecimal(value, 8);
					case '8':
						return formatDecimal(value, 0);
					case '9':
						return formatDecimal(value, 1);
					case 'A':
						return formatDecimal(value, 2);
					case 'B':
						return formatDecimal(value, 3);
					case 'C':
						return formatDecimal(value, 4);
					case 'D':
						return formatDecimal(value, 5);
					case 'E':
						return formatDecimal(value, 6);
					default:
						return value;
				}
			};
		}
		else {
			format = function(value, unitcode) {
				if (value === '' || value === undefined || value === null || lodashIsNaN(value))
					return '';

				var sign = (value >= 0) ? '' : '-';
				value = Math.abs(value);

				// Well, damn it, sometimes code that is beautiful just doesn't work quite right.
				// return [sign, Math.floor(value), fractionSeparator, frontPad((value - Math.floor(value)) * 8, 1)].join('');
				// will fail when Math.floor(value) is 0 and the fractionSeparator is '', since 0.500 => 04 instead of just 4

				switch (unitcode) {
					case '2':
						return [sign, getWholeNumberAsString(value), fractionSeparator, frontPad((value - Math.floor(value)) * 8, 1)].join('');
					case '3':
						return [sign, getWholeNumberAsString(value), fractionSeparator, frontPad((value - Math.floor(value)) * 16, 2)].join('');
					case '4':
						return [sign, getWholeNumberAsString(value), fractionSeparator, frontPad((value - Math.floor(value)) * 32, 2)].join('');
					case '5':
						return [sign, getWholeNumberAsString(value), fractionSeparator, frontPad((value - Math.floor(value)) * (specialFractions ? 320 : 64), (specialFractions ? 3 : 2))].join('');
					case '6':
						return [sign, getWholeNumberAsString(value), fractionSeparator, frontPad((value - Math.floor(value)) * (specialFractions ? 320 : 128), 3)].join('');
					case '7':
						return [sign, getWholeNumberAsString(value), fractionSeparator, frontPad((value - Math.floor(value)) * (specialFractions ? 320 : 256), 3)].join('');
					case '8':
						return sign + formatDecimal(value, 0);
					case '9':
						return sign + formatDecimal(value, 1);
					case 'A':
						return sign + formatDecimal(value, 2);
					case 'B':
						return sign + formatDecimal(value, 3);
					case 'C':
						return sign + formatDecimal(value, 4);
					case 'D':
						return sign + formatDecimal(value, 5);
					case 'E':
						return sign + formatDecimal(value, 6);
					default:
						return sign + value;
				}
			};
		}

		return {
			format: format
		};
	};
}();
},{"lodash.isnan":3}],2:[function(require,module,exports){
module.exports = function() {
	'use strict';

	return function(useTwelveHourClock) {
		var formatTime;

		if (useTwelveHourClock) {
			formatTime = formatTwelveHourTime;
		} else {
			formatTime = formatTwentyFourHourTime;
		}

		return {
			format: function(q) {
				var returnRef;

				if (q.time) {
					var t = q.time;

					if (q.lastPrice && !q.flag) {
						returnRef = formatTime(t);
					} else {
						returnRef = [leftPad(t.getMonth() + 1), leftPad(t.getDate()), leftPad(t.getFullYear())].join('/');
					}
				} else {
					returnRef = '';
				}

				return returnRef;
			}
		};
	};

	function formatTwelveHourTime(t) {
		var hours = t.getHours();
		var period;

		if (hours === 0) {
			hours = 12;
			period = 'AM';
		} else if (hours > 12) {
			hours = hours - 12;
			period = 'PM';
		} else {
			hours = hours;
			period = 'AM';
		}

		return [leftPad(hours), leftPad(t.getMinutes()), leftPad(t.getSeconds())].join(':');
	}

	function formatTwentyFourHourTime(t) {
		return [leftPad(t.getHours()), leftPad(t.getMinutes()), leftPad(t.getSeconds())].join(':');
	}

	function leftPad(value) {
		return ['00', value].join('').substr(-2);
	}
}();
},{}],3:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
 * which returns `true` for `undefined` and other non-numeric values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * _.isNaN(NaN);
 * // => true
 *
 * _.isNaN(new Number(NaN));
 * // => true
 *
 * isNaN(undefined);
 * // => true
 *
 * _.isNaN(undefined);
 * // => false
 */
function isNaN(value) {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some ActiveX objects in IE.
  return isNumber(value) && value != +value;
}

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && objectToString.call(value) == numberTag);
}

module.exports = isNaN;

},{}],4:[function(require,module,exports){
var PriceFormatter = require('../../lib/priceFormatter');

describe('When a price formatter is created', function() {
	var priceFormatter;

	describe('with a decimal fraction separator', function() {
		beforeEach(function() {
			priceFormatter = new PriceFormatter('.');
		});

		it('formats 377 (with unit code 2) as "377.000"', function() {
			expect(priceFormatter.format(377, '2')).toEqual('377.000');
		});

		it('formats 377.5 (with unit code 2) as "377.500"', function() {
			expect(priceFormatter.format(377.5, '2')).toEqual('377.500');
		});

		it('formats 377.75 (with unit code 2) as "377.750"', function() {
			expect(priceFormatter.format(377.75, '2')).toEqual('377.750');
		});

		it('formats 3770.75 (with unit code 2) as "3770.750"', function() {
			expect(priceFormatter.format(3770.75, '2')).toEqual('3770.750');
		});

		it('formats 37700.75 (with unit code 2) as "37700.750"', function() {
			expect(priceFormatter.format(37700.75, '2')).toEqual('37700.750');
		});

		it('formats 377000.75 (with unit code 2) as "377000.750"', function() {
			expect(priceFormatter.format(377000.75, '2')).toEqual('377000.750');
		});

		it('formats 3770000.75 (with unit code 2) as "3770000.750"', function() {
			expect(priceFormatter.format(3770000.75, '2')).toEqual('3770000.750');
		});

		it('formats 3770000 (with unit code 2) as "3770000.000"', function() {
			expect(priceFormatter.format(3770000, '2')).toEqual('3770000.000');
		});

		it('formats 0 (with unit code 2) as "0.000"', function() {
			expect(priceFormatter.format(0, '2')).toEqual('0.000');
		});

		it('formats undefined (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(undefined, '2')).toEqual('');
		});

		it('formats null (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(null, '2')).toEqual('');
		});

		it('formats Number.NaN (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
		});

		it('formats 0 (with unit code 8) as "0"', function() {
			expect(priceFormatter.format(0, '8')).toEqual('0');
		});

		it('formats 1000 (with unit code 8) as "1000"', function() {
			expect(priceFormatter.format(1000, '8')).toEqual('1000');
		});
	});

	describe('with a decimal fraction separator, no special fractions, and a thousands separator', function() {
		beforeEach(function() {
			priceFormatter = new PriceFormatter('.', false, ',');
		});

		it('formats 377 (with unit code 2) as "377.000"', function() {
			expect(priceFormatter.format(377, '2')).toEqual('377.000');
		});

		it('formats 377.5 (with unit code 2) as "377.500"', function() {
			expect(priceFormatter.format(377.5, '2')).toEqual('377.500');
		});

		it('formats 377.75 (with unit code 2) as "377.750"', function() {
			expect(priceFormatter.format(377.75, '2')).toEqual('377.750');
		});

		it('formats 3770.75 (with unit code 2) as "3,770.750"', function() {
			expect(priceFormatter.format(3770.75, '2')).toEqual('3,770.750');
		});

		it('formats 37700.75 (with unit code 2) as "37,700.750"', function() {
			expect(priceFormatter.format(37700.75, '2')).toEqual('37,700.750');
		});

		it('formats 377000.75 (with unit code 2) as "377,000.750"', function() {
			expect(priceFormatter.format(377000.75, '2')).toEqual('377,000.750');
		});

		it('formats 3770000.75 (with unit code 2) as "3,770,000.750"', function() {
			expect(priceFormatter.format(3770000.75, '2')).toEqual('3,770,000.750');
		});

		it('formats 3770000 (with unit code 2) as "3,770,000.000"', function() {
			expect(priceFormatter.format(3770000, '2')).toEqual('3,770,000.000');
		});

		it('formats 0 (with unit code 2) as "0.000"', function() {
			expect(priceFormatter.format(0, '2')).toEqual('0.000');
		});

		it('formats undefined (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(undefined, '2')).toEqual('');
		});

		it('formats null (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(null, '2')).toEqual('');
		});

		it('formats Number.NaN (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
		});

		it('formats 0 (with unit code 8) as "0"', function() {
			expect(priceFormatter.format(0, '8')).toEqual('0');
		});

		it('formats 1000 (with unit code 8) as "1,000"', function() {
			expect(priceFormatter.format(1000, '8')).toEqual('1,000');
		});
	});

	describe('with a dash fraction separator and no special fractions', function() {
		beforeEach(function() {
			priceFormatter = new PriceFormatter('-', false);
		});

		it('formats 123 (with unit code 2) as "123-0"', function() {
			expect(priceFormatter.format(123, '2')).toEqual('123-0');
		});

		it('formats 123.5 (with unit code 2) as "123-4"', function() {
			expect(priceFormatter.format(123.5, '2')).toEqual('123-4');
		});

		it('formats 0.5 (with unit code 2) as "0-4"', function() {
			expect(priceFormatter.format(0.5, '2')).toEqual('0-4');
		});

		it('formats 0 (with unit code 2) as "0-0"', function() {
			expect(priceFormatter.format(0, '2')).toEqual('0-0');
		});

		it('formats zero-length string (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format('', '2')).toEqual('');
		});

		it('formats undefined (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(undefined, '2')).toEqual('');
		});

		it('formats null (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(null, '2')).toEqual('');
		});

		it('formats Number.NaN (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
		});

		it('formats 123 (with unit code A) as "123.00"', function() {
			expect(priceFormatter.format(123, 'A')).toEqual('123.00');
		});

		it('formats 123.5 (with unit code A) as "123.50"', function() {
			expect(priceFormatter.format(123.5, 'A')).toEqual('123.50');
		});

		it('formats 123.555 (with unit code A) as "123.56"', function() {
			expect(priceFormatter.format(123.555, 'A')).toEqual('123.56');
		});
	});

	describe('with a tick fraction separator and no special fractions', function() {
		beforeEach(function() {
			priceFormatter = new PriceFormatter('\'', false);
		});

		it('formats 123 (with unit code 2) as "123\'0"', function() {
			expect(priceFormatter.format(123, '2')).toEqual('123\'0');
		});

		it('formats 123.5 (with unit code 2) as "123\'4"', function() {
			expect(priceFormatter.format(123.5, '2')).toEqual('123\'4');
		});

		it('formats 0.5 (with unit code 2) as "0\'4"', function() {
			expect(priceFormatter.format(0.5, '2')).toEqual('0\'4');
		});

		it('formats 0 (with unit code 2) as "0\'0"', function() {
			expect(priceFormatter.format(0, '2')).toEqual('0\'0');
		});

		it('formats zero-length string (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format('', '2')).toEqual('');
		});

		it('formats undefined (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(undefined, '2')).toEqual('');
		});

		it('formats null (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(null, '2')).toEqual('');
		});

		it('formats Number.NaN (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
		});
	});

	describe('with no fraction separator and no special fractions', function() {
		beforeEach(function() {
			priceFormatter = new PriceFormatter('', false);
		});

		it('formats 123 (with unit code 2) as "1230"', function() {
			expect(priceFormatter.format(123, '2')).toEqual('1230');
		});

		it('formats 123.5 (with unit code 2) as "1234"', function() {
			expect(priceFormatter.format(123.5, '2')).toEqual('1234');
		});

		it('formats 0.5 (with unit code 2) as "4"', function() {
			expect(priceFormatter.format(0.5, '2')).toEqual('4');
		});

		it('formats 0 (with unit code 2) as "0"', function() {
			expect(priceFormatter.format(0, '2')).toEqual('0');
		});

		it('formats zero-length string (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format('', '2')).toEqual('');
		});

		it('formats undefined (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(undefined, '2')).toEqual('');
		});

		it('formats null (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(null, '2')).toEqual('');
		});

		it('formats Number.NaN (with unit code 2) as zero-length string', function() {
			expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
		});
	});
});
},{"../../lib/priceFormatter":1}],5:[function(require,module,exports){
var timeFormatter = require('../../lib/timeFormatter');

describe('When a time formatter is created (without specifying the clock)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter();
	});

	describe('and a quote is formatted (with no "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "00:00:00"', function() {
				expect(tf.format(quote)).toEqual('00:00:00');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08:09"', function() {
				expect(tf.format(quote)).toEqual('07:08:09');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "13:08:09"', function() {
				expect(tf.format(quote)).toEqual('13:08:09');
			});
		});
	});

	describe('and a quote is formatted (with with a "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456,
				flag: 'p'
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});
	});
});

describe('When a time formatter is created (and a 24-hour clock is specified)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter(false);
	});

	describe('and a quote is formatted (with no "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "00:00:00"', function() {
				expect(tf.format(quote)).toEqual('00:00:00');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08:09"', function() {
				expect(tf.format(quote)).toEqual('07:08:09');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "13:08:09"', function() {
				expect(tf.format(quote)).toEqual('13:08:09');
			});
		});
	});

	describe('and a quote is formatted (with with a "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456,
				flag: 'p'
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});
	});
});

describe('When a time formatter is created (and a 12-hour clock is specified)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter(true);
	});

	describe('and a quote is formatted (with no "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is five after midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 5, 0);
			});

			it('the formatter outputs "12:05:00"', function() {
				expect(tf.format(quote)).toEqual('12:05:00');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is ten after noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 10, 0);
			});

			it('the formatter outputs "12:10:00"', function() {
				expect(tf.format(quote)).toEqual('12:10:00');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08:09"', function() {
				expect(tf.format(quote)).toEqual('07:08:09');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "01:08:09"', function() {
				expect(tf.format(quote)).toEqual('01:08:09');
			});
		});
	});

	describe('and a quote is formatted (with with a "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456,
				flag: 'p'
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});
	});
});
},{"../../lib/timeFormatter":2}]},{},[4,5]);
