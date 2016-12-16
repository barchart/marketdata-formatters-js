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