(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
	'use strict';

	return {
		unitCodeToBaseCode: function(unitCode) {
			switch (unitCode) {
				case '2':
					return -1;
				case '3':
					return -2;
				case '4':
					return -3;
				case '5':
					return -4;
				case '6':
					return -5;
				case '7':
					return -6;
				case '8':
					return 0;
				case '9':
					return 1;
				case 'A':
					return 2;
				case 'B':
					return 3;
				case 'C':
					return 4;
				case 'D':
					return 5;
				case 'E':
					return 6;
				case 'F':
					return 7;
				default:
					return 0;
			}
		},

		baseCodeToUnitCode: function(baseCode) {
			switch (baseCode) {
				case -1:
					return '2';
				case -2:
					return '3';
				case -3:
					return '4';
				case -4:
					return '5';
				case -5:
					return '6';
				case -6:
					return '7';
				case 0:
					return '8';
				case 1:
					return '9';
				case 2:
					return 'A';
				case 3:
					return 'B';
				case 4:
					return 'C';
				case 5:
					return 'D';
				case 6:
					return 'E';
				case 7:
					return 'F';
				default:
					return 0;
			}
		}
	};
}();
},{}],2:[function(require,module,exports){
var lodashIsNaN = require('lodash.isnan');

module.exports = function() {
	'use strict';

	return function(value, digits, thousandsSeparator) {
		if (value === '' || value === undefined || value === null || lodashIsNaN(value)) {
			return '';
		}

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
	};
}();
},{"lodash.isnan":6}],3:[function(require,module,exports){
var lodashIsNaN = require('lodash.isnan');
var decimalFormatter = require('./decimalFormatter');

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
			return decimalFormatter(value, digits, thousandsSeparator);
		}

		if (fractionSeparator == '.') { // Decimals
			format = function(value, unitcode) {
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
						if (value === '' || value === undefined || value === null || lodashIsNaN(value))
							return '';
						else
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
},{"./decimalFormatter":2,"lodash.isnan":6}],4:[function(require,module,exports){
module.exports = function() {
	'use strict';

	return {
		format: function(symbol) {
			var returnRef;

			if (symbol !== null && typeof symbol === 'string') {
				returnRef = symbol.toUpperCase();
			} else {
				returnRef = symbol;
			}

			return returnRef;
 		}
	};
}();
},{}],5:[function(require,module,exports){
module.exports = function() {
	'use strict';

	return function(useTwelveHourClock, short) {
		var formatTime;

		if (useTwelveHourClock) {
			if (short) {
				formatTime = formatTwelveHourTimeShort;
			} else {
				formatTime = formatTwelveHourTime;
			}
		} else {
			if (short) {
				formatTime = formatTwentyFourHourTimeShort;
			} else {
				formatTime = formatTwentyFourHourTime;
			}
		}

		var formatters = {
			format: function(q) {
				var t = q.time;

				if (!t) {
					return '';
				} else if (q.lastPrice && !q.flag) {
					return formatters.formatTime(t, q.timezone);
				} else {
					return formatters.formatDate(t);
				}
			},

			formatTime: function(date, timezone) {
				var returnRef;

				if (date) {
					returnRef = formatTime(date);

					if (timezone) {
						returnRef = returnRef + ' ' + timezone;
					}
				} else {
					returnRef = '';
				}

				return returnRef;
			},

			formatDate: function(date) {
				if (date) {
					return leftPad(date.getMonth() + 1) + '/' + leftPad(date.getDate()) + '/' + leftPad(date.getFullYear());
				} else {
					return '';
				}
			}
		};

		return formatters;
	};

	function formatTwelveHourTime(t) {
		var hours = t.getHours();
		var period;

		if (hours === 0) {
			hours = 12;
			period = 'AM';
		} else if (hours === 12) {
			hours = hours;
			period = 'PM';
		} else if (hours > 12) {
			hours = hours - 12;
			period = 'PM';
		} else {
			hours = hours;
			period = 'AM';
		}

		return leftPad(hours) + ':' + leftPad(t.getMinutes()) + ':' + leftPad(t.getSeconds()) + ' ' + period;
	}

	function formatTwelveHourTimeShort(t) {
		var hours = t.getHours();
		var period;

		if (hours === 0) {
			hours = 12;
			period = 'A';
		} else if (hours === 12) {
			hours = hours;
			period = 'P';
		} else if (hours > 12) {
			hours = hours - 12;
			period = 'P';
		} else {
			hours = hours;
			period = 'A';
		}

		return leftPad(hours) + ':' + leftPad(t.getMinutes()) + period;
	}

	function formatTwentyFourHourTime(t) {
		return leftPad(t.getHours()) + ':' + leftPad(t.getMinutes()) + ':' + leftPad(t.getSeconds());
	}

	function formatTwentyFourHourTimeShort(t) {
		return leftPad(t.getHours()) + ':' + leftPad(t.getMinutes());
	}

	function leftPad(value) {
		return ('00' + value).substr(-2);
	}
}();
},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
var convert = require('../../lib/convert');

describe('When converting a baseCode to a unitCode', function() {
	it('-1 should translate to "2"', function() {
		expect(convert.baseCodeToUnitCode(-1)).toEqual('2');
	});

	it('-2 should translate to "3"', function() {
		expect(convert.baseCodeToUnitCode(-2)).toEqual('3');
	});

	it('-3 should translate to "4"', function() {
		expect(convert.baseCodeToUnitCode(-3)).toEqual('4');
	});

	it('-4 should translate to "5"', function() {
		expect(convert.baseCodeToUnitCode(-4)).toEqual('5');
	});

	it('-5 should translate to "6"', function() {
		expect(convert.baseCodeToUnitCode(-5)).toEqual('6');
	});

	it('-6 should translate to "7"', function() {
		expect(convert.baseCodeToUnitCode(-6)).toEqual('7');
	});

	it('0 should translate to "8"', function() {
		expect(convert.baseCodeToUnitCode(0)).toEqual('8');
	});

	it('1 should translate to "9"', function() {
		expect(convert.baseCodeToUnitCode(1)).toEqual('9');
	});

	it('2 should translate to "A"', function() {
		expect(convert.baseCodeToUnitCode(2)).toEqual('A');
	});

	it('3 should translate to "B"', function() {
		expect(convert.baseCodeToUnitCode(3)).toEqual('B');
	});

	it('4 should translate to "C"', function() {
		expect(convert.baseCodeToUnitCode(4)).toEqual('C');
	});

	it('5 should translate to "D"', function() {
		expect(convert.baseCodeToUnitCode(5)).toEqual('D');
	});

	it('6 should translate to "E"', function() {
		expect(convert.baseCodeToUnitCode(6)).toEqual('E');
	});

	it('7 should translate to "F"', function() {
		expect(convert.baseCodeToUnitCode(7)).toEqual('F');
	});

	it('"-1" should translate to 0', function() {
		expect(convert.baseCodeToUnitCode("-1")).toEqual(0);
	});

	it('A null value should translate to 0', function() {
		expect(convert.baseCodeToUnitCode(null)).toEqual(0);
	});

	it('An undefined value should translate to 0', function() {
		expect(convert.baseCodeToUnitCode(undefined)).toEqual(0);
	});
});

describe('When converting a unitCode to a baseCode', function() {
	it('"2" should translate to -1', function() {
		expect(convert.unitCodeToBaseCode("2")).toEqual(-1);
	});

	it('"3" should translate to -2', function() {
		expect(convert.unitCodeToBaseCode("3")).toEqual(-2);
	});

	it('"4" should translate to -3', function() {
		expect(convert.unitCodeToBaseCode("4")).toEqual(-3);
	});

	it('"5" should translate to -4', function() {
		expect(convert.unitCodeToBaseCode("5")).toEqual(-4);
	});

	it('"6" should translate to -5', function() {
		expect(convert.unitCodeToBaseCode("6")).toEqual(-5);
	});

	it('"7" should translate to -6', function() {
		expect(convert.unitCodeToBaseCode("7")).toEqual(-6);
	});

	it('"8" should translate to 0', function() {
		expect(convert.unitCodeToBaseCode("8")).toEqual(0);
	});

	it('"9" should translate to 1', function() {
		expect(convert.unitCodeToBaseCode("9")).toEqual(1);
	});

	it('"A" should translate to 1', function() {
		expect(convert.unitCodeToBaseCode("A")).toEqual(2);
	});

	it('"B" should translate to 3', function() {
		expect(convert.unitCodeToBaseCode("B")).toEqual(3);
	});

	it('"C" should translate to 4', function() {
		expect(convert.unitCodeToBaseCode("C")).toEqual(4);
	});

	it('"D" should translate to 5', function() {
		expect(convert.unitCodeToBaseCode("D")).toEqual(5);
	});

	it('"E" should translate to 6', function() {
		expect(convert.unitCodeToBaseCode("E")).toEqual(6);
	});

	it('"F" should translate to 6', function() {
		expect(convert.unitCodeToBaseCode("F")).toEqual(7);
	});

	it('2 should translate to ', function() {
		expect(convert.unitCodeToBaseCode(2)).toEqual(0);
	});

	it('A null value should translate to 0', function() {
		expect(convert.unitCodeToBaseCode(null)).toEqual(0);
	});

	it('An undefined value should translate to 0', function() {
		expect(convert.unitCodeToBaseCode(undefined)).toEqual(0);
	});
});
},{"../../lib/convert":1}],8:[function(require,module,exports){
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
},{"../../lib/decimalFormatter":2}],9:[function(require,module,exports){
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
},{"../../lib/priceFormatter":3}],10:[function(require,module,exports){
var symbolFormatter = require('../../lib/symbolFormatter');

describe('When a lowercase string is formatted as a symbol', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = 'aapl');
	});

	it('The result should only contain uppercase letters', function() {
		expect(formattedSymbol).toEqual('AAPL');
	});
});

describe('When an uppercase string is formatted as a symbol', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = 'AAPL');
	});

	it('The result should only contain uppercase letters', function() {
		expect(formattedSymbol).toEqual('AAPL');
	});
});

describe('When a mixed case string is formatted as a symbol', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = 'aApL');
	});

	it('The result should only contain uppercase letters', function() {
		expect(formattedSymbol).toEqual('AAPL');
	});
});

describe('When a zero-length string is formatted as a symbol', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = '');
	});

	it('The result should be the original, zero-length string', function() {
		expect(formattedSymbol).toEqual(originalSymbol);
	});
});

describe('When a string with numbers is formatted as a symbol', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = 'esm16');
	});

	it('The result should only contain uppercase letters', function() {
		expect(formattedSymbol).toEqual('ESM16');
	});
});

describe('When a number is formatted as a symbol', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = 1);
	});

	it('The result should be a number', function() {
		expect(typeof formattedSymbol).toEqual('number');
	});

	it('The result should the original, unformatted string', function() {
		expect(formattedSymbol).toEqual(originalSymbol);
	});
});

describe('When an undefined value is formatted as a symbol', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = undefined);
	});

	it('The result should be a undefined', function() {
		expect(typeof formattedSymbol).toEqual('undefined');
	});
});

describe('When an null value is formatted', function() {
	var originalSymbol;
	var formattedSymbol;

	beforeEach(function() {
		formattedSymbol = symbolFormatter.format(originalSymbol = null);
	});

	it('The result should be null', function() {
		expect(formattedSymbol).toEqual(null);
	});
});
},{"../../lib/symbolFormatter":4}],11:[function(require,module,exports){
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

		describe('and the quote time is 1:08:09 PM and timezone is present', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
				quote.timezone = 'CST';
			});

			it('the formatter outputs "13:08:09"', function() {
				expect(tf.format(quote)).toEqual('13:08:09 CST');
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

		describe('and the quote time is 1:08:09 PM and a timezone is present', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
				quote.timezone = 'EDT';
			});

			it('the formatter outputs "13:08:09"', function() {
				expect(tf.format(quote)).toEqual('13:08:09 EDT');
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

describe('When a time formatter is created (and a "short" 24-hour clock is specified)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter(false, true);
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

			it('the formatter outputs "00:00"', function() {
				expect(tf.format(quote)).toEqual('00:00');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00"', function() {
				expect(tf.format(quote)).toEqual('12:00');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08"', function() {
				expect(tf.format(quote)).toEqual('07:08');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "13:08"', function() {
				expect(tf.format(quote)).toEqual('13:08');
			});
		});

		describe('and the quote time is 1:08:09 PM and a timezone is present', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
				quote.timezone = 'EDT';
			});

			it('the formatter outputs "13:08"', function() {
				expect(tf.format(quote)).toEqual('13:08 EDT');
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

			it('the formatter outputs "12:00:00 AM"', function() {
				expect(tf.format(quote)).toEqual('12:00:00 AM');
			});
		});

		describe('and the quote time is five after midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 5, 0);
			});

			it('the formatter outputs "12:05:00 AM"', function() {
				expect(tf.format(quote)).toEqual('12:05:00 AM');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00:00 PM"', function() {
				expect(tf.format(quote)).toEqual('12:00:00 PM');
			});
		});

		describe('and the quote time is ten after noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 10, 0);
			});

			it('the formatter outputs "12:10:00 PM"', function() {
				expect(tf.format(quote)).toEqual('12:10:00 PM');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08:09 AM"', function() {
				expect(tf.format(quote)).toEqual('07:08:09 AM');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "01:08:09 PM"', function() {
				expect(tf.format(quote)).toEqual('01:08:09 PM');
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

describe('When a time formatter is created (and a "short" 12-hour clock is specified)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter(true, true);
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

			it('the formatter outputs "12:00A"', function() {
				expect(tf.format(quote)).toEqual('12:00A');
			});
		});

		describe('and the quote time is five after midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 5, 0);
			});

			it('the formatter outputs "12:05A"', function() {
				expect(tf.format(quote)).toEqual('12:05A');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00P"', function() {
				expect(tf.format(quote)).toEqual('12:00P');
			});
		});

		describe('and the quote time is ten after noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 10, 0);
			});

			it('the formatter outputs "12:10P"', function() {
				expect(tf.format(quote)).toEqual('12:10P');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08A"', function() {
				expect(tf.format(quote)).toEqual('07:08A');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "01:08P"', function() {
				expect(tf.format(quote)).toEqual('01:08P');
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
},{"../../lib/timeFormatter":5}]},{},[7,8,9,10,11]);
