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

		if (thousandsSeparator && !(value > -1000 && value < 1000)) {
			var length = returnRef.length;
			var negative = value < 0;

			var found = digits === 0;
			var counter = 0;

			var buffer = [];

			for (var i = (length - 1); !(i < 0); i--) {
				if (counter === 3 && !(negative && i === 0)) {
					buffer.unshift(thousandsSeparator);

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

	/*
	 // An alternative to consider ... seems about 15% faster ... not to
	 // mention much less lengthy ... but, has a problem with more than
	 // three decimal places ... regular expression needs work ...

	 return function(value, digits, thousandsSeparator) {
	 	if (typeof value === 'number' && (value || value === 0)) {
	 		return value.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator || ',');
	 	} else {
	 		return '';
		}
	 };
	 */
}();
},{"lodash.isnan":9}],3:[function(require,module,exports){
module.exports = function() {
	'use strict';

	var monthMap = { };
	var numberMap = { };

	var addMonth = function (code, name, number) {
		monthMap[code] = name;
		numberMap[code] = number;
	};

	addMonth("F", "January", 1);
	addMonth("G", "February", 2);
	addMonth("H", "March", 3);
	addMonth("J", "April", 4);
	addMonth("K", "May", 5);
	addMonth("M", "June", 6);
	addMonth("N", "July", 7);
	addMonth("Q", "August", 8);
	addMonth("U", "September", 9);
	addMonth("V", "October", 10);
	addMonth("X", "November", 11);
	addMonth("Z", "December", 12);
	addMonth("Y", "Cash", 0);

	return {
		getCodeToNameMap: function() {
			return monthMap;
		},

		getCodeToNumberMap: function() {
			return numberMap;
		}
	};
}();
},{}],4:[function(require,module,exports){
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
		} else {
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
},{"./decimalFormatter":2,"lodash.isnan":9}],5:[function(require,module,exports){
module.exports = function() {
	'use strict';

	var replaceExpressions = { };

	function getReplaceExpression(thousandsSeparator) {
		if (!replaceExpressions.hasOwnProperty(thousandsSeparator)) {
			replaceExpressions[thousandsSeparator] = new RegExp(thousandsSeparator, 'g');
		}

		return replaceExpressions[thousandsSeparator];
	}

	return function(str, unitcode, thousandsSeparator) {
		if (str.length < 1) {
			return undefined;
		} else if (str === '-') {
			return null;
		}

		if (thousandsSeparator) {
			str = str.replace(getReplaceExpression(thousandsSeparator), '');
		}

		if (str.indexOf('.') > 0) {
			return parseFloat(str);
		}

		var sign = (str.substr(0, 1) == '-') ? -1 : 1;

		if (sign === -1) {
			str = str.substr(1);
		}

		switch (unitcode) {
			case '2': // 8ths
				return sign * (((str.length > 1) ? parseInt(str.substr(0, str.length - 1)) : 0) + (parseInt(str.substr(-1)) / 8));
			case '3': // 16ths
				return sign * (((str.length > 2) ? parseInt(str.substr(0, str.length - 2)) : 0) + (parseInt(str.substr(-2)) / 16));
			case '4': // 32ths
				return sign * (((str.length > 2) ? parseInt(str.substr(0, str.length - 2)) : 0) + (parseInt(str.substr(-2)) / 32));
			case '5': // 64ths
				return sign * (((str.length > 2) ? parseInt(str.substr(0, str.length - 2)) : 0) + (parseInt(str.substr(-2)) / 64));
			case '6': // 128ths
				return sign * (((str.length > 3) ? parseInt(str.substr(0, str.length - 3)) : 0) + (parseInt(str.substr(-3)) / 128));
			case '7': // 256ths
				return sign * (((str.length > 3) ? parseInt(str.substr(0, str.length - 3)) : 0) + (parseInt(str.substr(-3)) / 256));
			case '8':
				return sign * parseInt(str);
			case '9':
				return sign * (parseInt(str) / 10);
			case 'A':
				return sign * (parseInt(str) / 100);
			case 'B':
				return sign * (parseInt(str) / 1000);
			case 'C':
				return sign * (parseInt(str) / 10000);
			case 'D':
				return sign * (parseInt(str) / 100000);
			case 'E':
				return sign * (parseInt(str) / 1000000);
			default:
				return sign * parseInt(str);
		}
	};
}();
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
module.exports = function() {
	'use strict';

	var exchangeRegex = /^(.*)\\.([A-Z]{1,4})$/i;

	var jerqFutureConversionRegex = /(.{1,3})([A-Z]{1})([0-9]{3}|[0-9]{1})?([0-9]{1})$/i;
	var concreteFutureRegex = /^(.{1,3})([A-Z]{1})([0-9]{4}|[0-9]{1,2})$/i;
	var referenceFutureRegex = /^(.{1,3})(\*{1})([0-9]{1})$/i;
	var futureSpreadRegex = /^_S_/i;
	var forexRegex = /^\^([A-Z]{3})([A-Z]{3})$/i;
	var sectorRegex = /^\-(.*)$/i;
	var indexRegex = /^\$(.*)$/i;
	var batsRegex = /^(.*)\.BZ$/i;
	var usePercentRegex = /(\.RT)$/;

	var symbolParser = {
		parseInstrumentType: function(symbol) {
			if (typeof symbol !== 'string') {
				return null;
			}

			var exchangeMatch = symbol.match(exchangeRegex);

			if (exchangeMatch !== null) {
				symbol = exchangeMatch[1];
			}

			if (futureSpreadRegex.test(symbol)) {
				return {
					symbol: symbol,
					type: 'future_spread'
				};
			}

			var staticFutureMatch = symbol.match(concreteFutureRegex);

			if (staticFutureMatch !== null) {
				var yearString = staticFutureMatch[3];
				var year = parseInt(yearString);

				if (yearString.length === 1 || yearString.length == 2) {
					var currentDate = new Date();
					var currentYear = currentDate.getFullYear();

					var base = Math.pow(10, yearString.length);

					year = year + currentYear - (currentYear % base);

					if (year < currentYear) {
						year = year + base;
					}
				}

				return {
					symbol: symbol,
					type: 'future',
					root: staticFutureMatch[1],
					dynamic: false,
					month: staticFutureMatch[2],
					year: year
				};
			}

			const dynamicFutureMatch = symbol.match(referenceFutureRegex);

			if (dynamicFutureMatch !== null) {
				return {
					symbol: symbol,
					type: 'future',
					root: dynamicFutureMatch[1],
					dynamic: true,
					dynamicCode: dynamicFutureMatch[3]
				};
			}

			const forexMatch = symbol.match(forexRegex);

			if (forexMatch !== null) {
				return {
					symbol: symbol,
					type: 'forex'
				};
			}

			const indexMatch = symbol.match(indexRegex);

			if (indexMatch !== null) {
				return {
					symbol: symbol,
					type: 'index'
				};
			}

			const sectorMatch = symbol.match(sectorRegex);

			if (sectorMatch !== null) {
				return {
					symbol: symbol,
					type: 'sector'
				};
			}

			return null;
		},

		getIsConcrete: function(symbol) {
			return !this.getIsReference(symbol);
		},

		getIsReference: function(symbol) {
			return referenceFutureRegex.test(symbol);
		},

		getIsFuture: function(symbol) {
			return getIsType(symbol, 'future');
		},

		getIsFutureSpread: function(symbol) {
			return getIsType(symbol, 'future_spread');
		},

		getIsForex: function(symbol) {
			return getIsType(symbol, 'forex');
		},

		getIsSector: function(symbol) {
			return getIsType(symbol, 'sector');
		},

		getIsIndex: function(symbol) {
			return getIsType(symbol, 'index');
		},

		getIsBats: function(symbol) {
			return batsRegex.test(symbol);
		},

		getProducerSymbol: function(symbol) {
			var returnRef;

			if (typeof symbol === 'string') {
				returnRef = symbol.replace(jerqFutureConversionRegex, '$1$2$4');
			} else {
				returnRef = null;
			}

			return returnRef;
		},

		displayUsingPercent: function(symbol) {
			return usePercentRegex.test(symbol);
		}
	};

	var getIsType = function(symbol, type) {
		var instrumentType = symbolParser.parseInstrumentType(symbol);

		return instrumentType !== null && instrumentType.type === type;
	};

	return symbolParser;
}();
},{}],8:[function(require,module,exports){
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
				} else if (!q.lastPrice || q.flag || q.sessionT) {
					return formatters.formatDate(t);
				} else {
					return formatters.formatTime(t, q.timezone);
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
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
},{"../../lib/convert":1}],11:[function(require,module,exports){
var decimalFormatter = require('../../lib/decimalFormatter');

describe('when formatting invalid values', function() {
	it('formats a null value as a zero-length string', function() {
		expect(decimalFormatter(null, 0, ',')).toEqual('');
	});

	it('formats an undefined value as a zero-length string', function() {
		expect(decimalFormatter(undefined, 0, ',')).toEqual('');
	});

	it('formats Number.NaN as a zero-length string', function() {
		expect(decimalFormatter(Number.NaN, 0, ',')).toEqual('');
	});
});

describe('when using the "decimal" formatter with zero decimals and thousands separator', function() {
	it('formats 0 as "0"', function() {
		expect(decimalFormatter(0, 0, ',')).toEqual('0');
	});

	it('formats 0.1 as "0"', function() {
		expect(decimalFormatter(0.1, 0, ',')).toEqual('0');
	});

	it('formats 0.9 as "0"', function() {
		expect(decimalFormatter(0.9, 0, ',')).toEqual('1');
	});

	it('formats 377 as "377"', function() {
		expect(decimalFormatter(377, 0, ',')).toEqual('377');
	});

	it('formats -377 as "-377"', function() {
		expect(decimalFormatter(-377, 0, ',')).toEqual('-377');
	});

	it('formats 377.99 as "378"', function() {
		expect(decimalFormatter(377.99, 0, ',')).toEqual('378');
	});

	it('formats -377.99 as "-378"', function() {
		expect(decimalFormatter(-377.99, 0, ',')).toEqual('-378');
	});

	it('formats 377.49 as "377"', function() {
		expect(decimalFormatter(377.49, 0, ',')).toEqual('377');
	});

	it('formats -377.49 as "-377"', function() {
		expect(decimalFormatter(-377.49, 0, ',')).toEqual('-377');
	});

	it('formats 377377 as "377,377"', function() {
		expect(decimalFormatter(377377, 0, ',')).toEqual('377,377');
	});

	it('formats -377377 as "-377,377"', function() {
		expect(decimalFormatter(-377377, 0, ',')).toEqual('-377,377');
	});

	it('formats 377377.49 as "377,377"', function() {
		expect(decimalFormatter(377377.49, 0, ',')).toEqual('377,377');
	});

	it('formats -377377.49 as "-377,377"', function() {
		expect(decimalFormatter(-377377.49, 0, ',')).toEqual('-377,377');
	});

	it('formats 377377.99 as "377,378"', function() {
		expect(decimalFormatter(377377.99, 0, ',')).toEqual('377,378');
	});

	it('formats -377377.99 as "-377,378"', function() {
		expect(decimalFormatter(-377377.99, 0, ',')).toEqual('-377,378');
	});
});

describe('when using the "decimal" formatter with two decimals and thousands separator', function() {
	it('formats 0 as "0.00"', function() {
		expect(decimalFormatter(0, 2, ',')).toEqual('0.00');
	});

	it('formats 0.001 as "0.00"', function() {
		expect(decimalFormatter(0.001, 2, ',')).toEqual('0.00');
	});

	it('formats 0.009 as "0.01"', function() {
		expect(decimalFormatter(0.009, 2, ',')).toEqual('0.01');
	});

	it('formats 123.45 as "123.45"', function() {
		expect(decimalFormatter(123.45, 2, ',')).toEqual('123.45');
	});

	it('formats -123.45 as "-123.45"', function() {
		expect(decimalFormatter(-123.45, 2, ',')).toEqual('-123.45');
	});

	it('formats 1234.5 as "1234.50"', function() {
		expect(decimalFormatter(1234.5, 2, ',')).toEqual('1,234.50');
	});

	it('formats -1234.5 as "-1234.50"', function() {
		expect(decimalFormatter(-1234.5, 2, ',')).toEqual('-1,234.50');
	});

	it('formats 123456.789 as "123,456.79"', function() {
		expect(decimalFormatter(123456.789, 2, ',')).toEqual('123,456.79');
	});

	it('formats -123456.789 as "-123,456.79"', function() {
		expect(decimalFormatter(-123456.789, 2, ',')).toEqual('-123,456.79');
	});
});

describe('when using the "decimal" formatter with four decimals and thousands separator', function() {
	it('formats 1234.56789 as "1,234.5679"', function () {
		expect(decimalFormatter(1234.56789, 4, ',')).toEqual('1,234.5679');
	});

	it('formats -1234.56789 as "-1,234.5679"', function () {
		expect(decimalFormatter(-1234.56789, 4, ',')).toEqual('-1,234.5679');
	});
});
},{"../../lib/decimalFormatter":2}],12:[function(require,module,exports){
var monthCodes = require('../../lib/monthCodes');

describe('When looking up a month name by code', function() {
	var map;

	beforeEach(function() {
		map = monthCodes.getCodeToNameMap();
	});

	it('"F" should map to "January"', function() {
		expect(map.F).toEqual("January");
	});

	it('"G" should map to "February"', function() {
		expect(map.G).toEqual("February");
	});

	it('"H" should map to "March"', function() {
		expect(map.H).toEqual("March");
	});

	it('"J" should map to "April"', function() {
		expect(map.J).toEqual("April");
	});

	it('"K" should map to "May"', function() {
		expect(map.K).toEqual("May");
	});

	it('"M" should map to "June"', function() {
		expect(map.M).toEqual("June");
	});

	it('"N" should map to "July"', function() {
		expect(map.N).toEqual("July");
	});

	it('"Q" should map to "August"', function() {
		expect(map.Q).toEqual("August");
	});

	it('"U" should map to "September"', function() {
		expect(map.U).toEqual("September");
	});

	it('"V" should map to "October"', function() {
		expect(map.V).toEqual("October");
	});

	it('"X" should map to "November"', function() {
		expect(map.X).toEqual("November");
	});

	it('"Z" should map to "December"', function() {
		expect(map.Z).toEqual("December");
	});
});

describe('When looking up a month number by code', function() {
	var map;

	beforeEach(function() {
		map = monthCodes.getCodeToNumberMap();
	});

	it('"F" should map to 1', function() {
		expect(map.F).toEqual(1);
	});

	it('"G" should map to 2', function() {
		expect(map.G).toEqual(2);
	});

	it('"H" should map to 3', function() {
		expect(map.H).toEqual(3);
	});

	it('"J" should map to 4', function() {
		expect(map.J).toEqual(4);
	});

	it('"K" should map to 5', function() {
		expect(map.K).toEqual(5);
	});

	it('"M" should map to 6', function() {
		expect(map.M).toEqual(6);
	});

	it('"N" should map to 7', function() {
		expect(map.N).toEqual(7);
	});

	it('"Q" should map to 8', function() {
		expect(map.Q).toEqual(8);
	});

	it('"U" should map to 9', function() {
		expect(map.U).toEqual(9);
	});

	it('"V" should map to 10', function() {
		expect(map.V).toEqual(10);
	});

	it('"X" should map to 11', function() {
		expect(map.X).toEqual(11);
	});

	it('"Z" should map to 12', function() {
		expect(map.Z).toEqual(12);
	});
});
},{"../../lib/monthCodes":3}],13:[function(require,module,exports){
var PriceFormatter = require('../../lib/priceFormatter');

describe('When a price formatter is created', function() {
	var priceFormatter;

	describe('with a decimal separator', function() {
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

	describe('with a decimal separator, no special fractions, and a thousands separator', function() {
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

	describe('with a dash separator and no special fractions', function() {
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

	describe('with a dash separator and special fractions', function() {
		beforeEach(function() {
			priceFormatter = new PriceFormatter('-', true, true);
		});

		it('formats 123.625 (with unit code 5) as "123-200"', function() {
			expect(priceFormatter.format(123.625, '5')).toEqual('123-200');
		});

		it('formats 123.640625 (with unit code 5) as "123-205"', function() {
			expect(priceFormatter.format(123.640625, '5')).toEqual('123-205');
		});
	});

	describe('with a tick separator and no special fractions', function() {
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

	describe('with no separator and no special fractions', function() {
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
},{"../../lib/priceFormatter":4}],14:[function(require,module,exports){
var priceParser = require('../../lib/priceParser');

describe('when parsing prices', function() {
	'use strict';

	describe('with a decimal fraction separator', function() {
		it('returns 377 (with unit code 2) when parsing "377.000"', function() {
			expect(priceParser('377.000', '2')).toEqual(377);
		});

		it('returns 377.5 (with unit code 2) when parsing "377.500"', function() {
			expect(priceParser('377.500', '2')).toEqual(377.5);
		});

		it('returns 377.75 (with unit code 2) when parsing "377.750"', function() {
			expect(priceParser('377.750', '2')).toEqual(377.75);
		});

		it('returns 3770.75 (with unit code 2) when parsing "3770.750"', function() {
			expect(priceParser('3770.750', '2')).toEqual(3770.75);
		});

		it('returns 37700.75 (with unit code 2) when parsing "37700.750"', function() {
			expect(priceParser('37700.750', '2')).toEqual(37700.75);
		});

		it('returns 377000.75 (with unit code 2) when parsing "377000.750"', function() {
			expect(priceParser('377000.750', '2')).toEqual(377000.75);
		});

		it('returns 3770000.75 (with unit code 2) when parsing "3770000.750"', function() {
			expect(priceParser('3770000.750', '2')).toEqual(3770000.75);
		});

		it('returns 3770000 (with unit code 2) when parsing "3770000.000"', function() {
			expect(priceParser('3770000.000', '2')).toEqual(3770000);
		});

		it('returns 0 (with unit code 2) when parsing "0.000"', function() {
			expect(priceParser('0.000', '2')).toEqual(0);
		});

		it('returns undefined (with unit code 2) when parsing zero-length string', function() {
			expect(priceParser('', '2')).toEqual(undefined);
		});

		it('returns 0 (with unit code 8) when parsing "0"', function() {
			expect(priceParser('0', '8')).toEqual(0);
		});

		it('returns 1000 (with unit code 8) when parsing "1000"', function() {
			expect(priceParser('1000', '8')).toEqual(1000);
		});
	});

	describe('with a decimal fraction separator and a comma thousands separator', function() {
		it('returns 3770.75 (with unit code 2) when parsing "3,770.750"', function() {
			expect(priceParser('3,770.750', '2', ',')).toEqual(3770.75);
		});

		it('returns 37700.75 (with unit code 2) when parsing "37,700.750"', function() {
			expect(priceParser('37,700.750', '2', ',')).toEqual(37700.75);
		});

		it('returns 377000.75 (with unit code 2) when parsing "377,000.750"', function() {
			expect(priceParser('377,000.750', '2', ',')).toEqual(377000.75);
		});

		it('returns 3770000.75 (with unit code 2) when parsing "3,770,000.750"', function() {
			expect(priceParser('3,770,000.750', '2', ',')).toEqual(3770000.75);
		});

		it('returns 3770000 (with unit code 2) when parsing "3,770,000.000"', function() {
			expect(priceParser('3,770,000.000', '2', ',')).toEqual(3770000);
		});
	});

	describe('with a dash fraction separator', function() {
		it('returns 123 (with unit code 2) when parsing "123-0"', function() {
			expect(priceParser('123-0', '2')).toEqual(123);
		});

		it('returns 123.5 (with unit code 2) when parsing "123-4"', function() {
			expect(priceParser('123-4', '2')).toEqual(123.5);
		});

		it('returns 0.5 (with unit code 2) when parsing "0-4"', function() {
			expect(priceParser('0-4', '2')).toEqual(0.5);
		});

		it('returns 0 (with unit code 2) when parsing "0-0"', function() {
			expect(priceParser('0-0', '2')).toEqual(0);
		});

		it('returns undefined (with unit code 2) when parsing zero-length string', function() {
			expect(priceParser('', '2')).toEqual(undefined);
		});
	});

	describe('with a tick fraction separator', function() {
		it('returns 123 (with unit code 2) when parsing "123\'0"', function() {
			expect(priceParser('123\'0', '2')).toEqual(123);
		});

		it('returns 123.5 (with unit code 2) when parsing "123\'4"', function() {
			expect(priceParser('123\'4', '2')).toEqual(123.5);
		});

		it('returns 0.5 (with unit code 2) when parsing "0\'4"', function() {
			expect(priceParser('0\'4', '2')).toEqual(0.5);
		});

		it('returns 0 (with unit code 2) when parsing "0\'0"', function() {
			expect(priceParser('0\'0', '2')).toEqual(0);
		});

		it('returns undefined (with unit code 2) when parsing zero-length string', function() {
			expect(priceParser('', '2')).toEqual(undefined);
		});
	});
});
},{"../../lib/priceParser":5}],15:[function(require,module,exports){
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
},{"../../lib/symbolFormatter":6}],16:[function(require,module,exports){
var symbolParser = require('../../lib/symbolParser');

describe('When parsing a symbol for instrument type', function() {
	describe('and the symbol is IBM', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('IBM');
		});

		it('the result should be null', function() {
			expect(instrumentType).toBe(null);
		});
	});

	describe('and the symbol is ESZ6', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('ESZ6');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "ESZ6"', function() {
			expect(instrumentType.symbol).toEqual('ESZ6');
		});

		it('the "type" should be "future"', function() {
			expect(instrumentType.type).toEqual('future');
		});

		it('the "dynamic" property should be false', function() {
			expect(instrumentType.dynamic).toEqual(false);
		});

		it('the "root" should be "ES"', function() {
			expect(instrumentType.root).toEqual('ES');
		});

		it('the "month" should be "Z"', function() {
			expect(instrumentType.month).toEqual('Z');
		});

		it('the "year" should be 2016', function() {
			expect(instrumentType.year).toEqual(2016);
		});
	});

	describe('and the symbol is ESZ16', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('ESZ16');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "ESZ16"', function() {
			expect(instrumentType.symbol).toEqual('ESZ16');
		});

		it('the "type" should be "future"', function() {
			expect(instrumentType.type).toEqual('future');
		});

		it('the "dynamic" property should be false', function() {
			expect(instrumentType.dynamic).toEqual(false);
		});

		it('the "root" should be "ES"', function() {
			expect(instrumentType.root).toEqual('ES');
		});

		it('the "month" should be "Z"', function() {
			expect(instrumentType.month).toEqual('Z');
		});

		it('the "year" should be 2016', function() {
			expect(instrumentType.year).toEqual(2016);
		});
	});

	describe('and the symbol is ESZ2016', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('ESZ2016');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "ES2016Z6"', function() {
			expect(instrumentType.symbol).toEqual('ESZ2016');
		});

		it('the "type" should be "future"', function() {
			expect(instrumentType.type).toEqual('future');
		});

		it('the "dynamic" property should be false', function() {
			expect(instrumentType.dynamic).toEqual(false);
		});

		it('the "root" should be "ES"', function() {
			expect(instrumentType.root).toEqual('ES');
		});

		it('the "month" should be "Z"', function() {
			expect(instrumentType.month).toEqual('Z');
		});

		it('the "year" should be 2016', function() {
			expect(instrumentType.year).toEqual(2016);
		});
	});

	describe('and the symbol is ES*0', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('ES*0');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "ES*0"', function() {
			expect(instrumentType.symbol).toEqual('ES*0');
		});

		it('the "type" should be "future"', function() {
			expect(instrumentType.type).toEqual('future');
		});

		it('the "dynamic" property should be true', function() {
			expect(instrumentType.dynamic).toEqual(true);
		});

		it('the "root" should be "ES"', function() {
			expect(instrumentType.root).toEqual('ES');
		});

		it('the "dynamicCode" property should be "0"', function() {
			expect(instrumentType.dynamicCode).toEqual('0');
		});
	});

	describe('and the symbol is ES*1', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('ES*1');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "ES*1"', function() {
			expect(instrumentType.symbol).toEqual('ES*1');
		});

		it('the "type" should be "future"', function() {
			expect(instrumentType.type).toEqual('future');
		});

		it('the "dynamic" property should be true', function() {
			expect(instrumentType.dynamic).toEqual(true);
		});

		it('the "root" should be "ES"', function() {
			expect(instrumentType.root).toEqual('ES');
		});

		it('the "dynamicCode" property should be "1"', function() {
			expect(instrumentType.dynamicCode).toEqual('1');
		});
	});

	describe('and the symbol is ^EURUSD', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('^EURUSD');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "^EURUSD"', function() {
			expect(instrumentType.symbol).toEqual('^EURUSD');
		});

		it('the "type" should be "forex"', function() {
			expect(instrumentType.type).toEqual('forex');
		});
	});

	describe('and the symbol is $DOWI', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('$DOWI');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "$DOWI"', function() {
			expect(instrumentType.symbol).toEqual('$DOWI');
		});

		it('the "type" should be "index"', function() {
			expect(instrumentType.type).toEqual('index');
		});
	});

	describe('and the symbol is -001A', function() {
		var instrumentType;

		beforeEach(function() {
			instrumentType = symbolParser.parseInstrumentType('-001A');
		});

		it('the result should not be null', function() {
			expect(instrumentType).not.toBe(null);
		});

		it('the "symbol" should be "-001A"', function() {
			expect(instrumentType.symbol).toEqual('-001A');
		});

		it('the "type" should be "index"', function() {
			expect(instrumentType.type).toEqual('sector');
		});
	});
});

describe('When checking to see if a symbol is a future', function() {
	it('the symbol "ESZ6" should return true', function() {
		expect(symbolParser.getIsFuture('ESZ6')).toEqual(true);
	});

	it('the symbol "ESZ16" should return true', function() {
		expect(symbolParser.getIsFuture('ESZ16')).toEqual(true);
	});

	it('the symbol "ESZ2016" should return true', function() {
		expect(symbolParser.getIsFuture('ESZ2016')).toEqual(true);
	});

	it('the symbol "ESZ016" should return false', function() {
		expect(symbolParser.getIsFuture('ESZ016')).toEqual(false);
	});

	it('the symbol "O!H7" should return true', function() {
		expect(symbolParser.getIsFuture('O!H7')).toEqual(true);
	});

	it('the symbol "O!H17" should return true', function() {
		expect(symbolParser.getIsFuture('O!H17')).toEqual(true);
	});

	it('the symbol "O!H2017" should return true', function() {
		expect(symbolParser.getIsFuture('O!H2017')).toEqual(true);
	});

	it('the symbol "IBM" should return false', function() {
		expect(symbolParser.getIsFuture('IBM')).toEqual(false);
	});

	it('the symbol "^EURUSD" should return false', function() {
		expect(symbolParser.getIsFuture('^EURUSD')).toEqual(false);
	});

	it('the symbol "-001A" should return false', function() {
		expect(symbolParser.getIsFuture('-001A')).toEqual(false);
	});

	it('the symbol "$DOWI" should return false', function() {
		expect(symbolParser.getIsFuture('$DOWI')).toEqual(false);
	});

	it('the symbol "_S_SP_ZCH7_ZCK7" should return false', function() {
		expect(symbolParser.getIsFuture('_S_SP_ZCH7_ZCK7')).toEqual(false);
	});
});

describe('When checking to see if a symbol is a "concrete" future', function() {
	it('the symbol "ESZ6" should return true', function() {
		expect(symbolParser.getIsConcrete('ESZ6')).toEqual(true);
	});

	it('the symbol "ESZ16" should return true', function() {
		expect(symbolParser.getIsConcrete('ESZ16')).toEqual(true);
	});

	it('the symbol "ESZ2016" should return true', function() {
		expect(symbolParser.getIsConcrete('ESZ2016')).toEqual(true);
	});

	it('the symbol "ES*0" should return false', function() {
		expect(symbolParser.getIsConcrete('ES*0')).toEqual(false);
	});

	it('the symbol "ES*1" should return false', function() {
		expect(symbolParser.getIsConcrete('ES*1')).toEqual(false);
	});
});

describe('When checking to see if a symbol is a "reference" future', function() {
	it('the symbol "ESZ6" should return false', function() {
		expect(symbolParser.getIsReference('ESZ6')).toEqual(false);
	});

	it('the symbol "ESZ16" should return false', function() {
		expect(symbolParser.getIsReference('ESZ16')).toEqual(false);
	});

	it('the symbol "ESZ2016" should return false', function() {
		expect(symbolParser.getIsReference('ESZ2016')).toEqual(false);
	});

	it('the symbol "ES*0" should return true', function() {
		expect(symbolParser.getIsReference('ES*0')).toEqual(true);
	});

	it('the symbol "ES*1" should return true', function() {
		expect(symbolParser.getIsReference('ES*1')).toEqual(true);
	});
});

describe('When checking to see if a symbol is sector', function() {
	it('the symbol "ESZ6" should return false', function() {
		expect(symbolParser.getIsSector('ESZ6')).toEqual(false);
	});

	it('the symbol "ESZ16" should return false', function() {
		expect(symbolParser.getIsSector('ESZ16')).toEqual(false);
	});

	it('the symbol "ESZ2016" should return false', function() {
		expect(symbolParser.getIsSector('ESZ2016')).toEqual(false);
	});

	it('the symbol "ESZ016" should return false', function() {
		expect(symbolParser.getIsSector('ESZ016')).toEqual(false);
	});

	it('the symbol "O!H7" should return false', function() {
		expect(symbolParser.getIsSector('O!H7')).toEqual(false);
	});

	it('the symbol "O!H17" should return false', function() {
		expect(symbolParser.getIsSector('O!H17')).toEqual(false);
	});

	it('the symbol "O!H2017" should return false', function() {
		expect(symbolParser.getIsSector('O!H2017')).toEqual(false);
	});

	it('the symbol "IBM" should return false', function() {
		expect(symbolParser.getIsSector('IBM')).toEqual(false);
	});

	it('the symbol "^EURUSD" should return false', function() {
		expect(symbolParser.getIsSector('^EURUSD')).toEqual(false);
	});

	it('the symbol "-001A" should return true', function() {
		expect(symbolParser.getIsSector('-001A')).toEqual(true);
	});

	it('the symbol "$DOWI" should return false', function() {
		expect(symbolParser.getIsSector('$DOWI')).toEqual(false);
	});

	it('the symbol "_S_SP_ZCH7_ZCK7" should return false', function() {
		expect(symbolParser.getIsSector('_S_SP_ZCH7_ZCK7')).toEqual(false);
	});
});

describe('When checking to see if a symbol is forex', function() {
	it('the symbol "ESZ6" should return false', function() {
		expect(symbolParser.getIsForex('ESZ6')).toEqual(false);
	});

	it('the symbol "ESZ16" should return false', function() {
		expect(symbolParser.getIsForex('ESZ16')).toEqual(false);
	});

	it('the symbol "ESZ2016" should return false', function() {
		expect(symbolParser.getIsForex('ESZ2016')).toEqual(false);
	});

	it('the symbol "ESZ016" should return false', function() {
		expect(symbolParser.getIsForex('ESZ016')).toEqual(false);
	});

	it('the symbol "O!H7" should return false', function() {
		expect(symbolParser.getIsForex('O!H7')).toEqual(false);
	});

	it('the symbol "O!H17" should return false', function() {
		expect(symbolParser.getIsForex('O!H17')).toEqual(false);
	});

	it('the symbol "O!H2017" should return false', function() {
		expect(symbolParser.getIsForex('O!H2017')).toEqual(false);
	});

	it('the symbol "IBM" should return false', function() {
		expect(symbolParser.getIsForex('IBM')).toEqual(false);
	});

	it('the symbol "^EURUSD" should return true', function() {
		expect(symbolParser.getIsForex('^EURUSD')).toEqual(true);
	});

	it('the symbol "-001A" should return false', function() {
		expect(symbolParser.getIsForex('-001A')).toEqual(false);
	});

	it('the symbol "$DOWI" should return false', function() {
		expect(symbolParser.getIsForex('$DOWI')).toEqual(false);
	});

	it('the symbol "_S_SP_ZCH7_ZCK7" should return false', function() {
		expect(symbolParser.getIsForex('_S_SP_ZCH7_ZCK7')).toEqual(false);
	});
});

describe('When checking to see if a symbol is a future spread', function() {
	it('the symbol "ESZ6" should return false', function() {
		expect(symbolParser.getIsFutureSpread('ESZ6')).toEqual(false);
	});

	it('the symbol "ESZ16" should return false', function() {
		expect(symbolParser.getIsFutureSpread('ESZ16')).toEqual(false);
	});

	it('the symbol "ESZ2016" should return false', function() {
		expect(symbolParser.getIsFutureSpread('ESZ2016')).toEqual(false);
	});

	it('the symbol "ESZ016" should return false', function() {
		expect(symbolParser.getIsFutureSpread('ESZ016')).toEqual(false);
	});

	it('the symbol "O!H7" should return false', function() {
		expect(symbolParser.getIsFutureSpread('O!H7')).toEqual(false);
	});

	it('the symbol "O!H17" should return false', function() {
		expect(symbolParser.getIsFutureSpread('O!H17')).toEqual(false);
	});

	it('the symbol "O!H2017" should return false', function() {
		expect(symbolParser.getIsFutureSpread('O!H2017')).toEqual(false);
	});

	it('the symbol "IBM" should return false', function() {
		expect(symbolParser.getIsFutureSpread('IBM')).toEqual(false);
	});

	it('the symbol "^EURUSD" should return false', function() {
		expect(symbolParser.getIsFutureSpread('^EURUSD')).toEqual(false);
	});

	it('the symbol "-001A" should return false', function() {
		expect(symbolParser.getIsFutureSpread('-001A')).toEqual(false);
	});

	it('the symbol "$DOWI" should return false', function() {
		expect(symbolParser.getIsFutureSpread('$DOWI')).toEqual(false);
	});

	it('the symbol "_S_SP_ZCH7_ZCK7" should return true', function() {
		expect(symbolParser.getIsFutureSpread('_S_SP_ZCH7_ZCK7')).toEqual(true);
	});
});

describe('When checking to see if a symbol is a BATS listing', function() {
	it('the symbol "IBM" should return false', function() {
		expect(symbolParser.getIsBats('IBM')).toEqual(false);
	});

	it('the symbol "IBM.BZ" should return true', function() {
		expect(symbolParser.getIsBats('IBM.BZ')).toEqual(true);
	});
});

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
},{"../../lib/symbolParser":7}],17:[function(require,module,exports){
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

	describe('and a quote is formatted (with with no "flag" and a "lastPrice" value and a "sessionT" indicator)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456,
				sessionT: true
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
},{"../../lib/timeFormatter":8}]},{},[10,11,12,13,14,15,16,17]);
