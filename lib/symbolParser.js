module.exports = (() => {
	'use strict';

	const exchangeRegex = /^(.*)\\.([A-Z]{1,4})$/i,
		jerqFutureConversionRegex = /(.{1,3})([A-Z]{1})([0-9]{3}|[0-9]{1})?([0-9]{1})$/i,
		concreteFutureRegex = /^([A-Z][A-Z0-9\$\-!\.]{0,2})([A-Z]{1})([0-9]{4}|[0-9]{1,2})$/i,
		referenceFutureRegex = /^([A-Z][A-Z0-9\$\-!\.]{0,2})(\*{1})([0-9]{1})$/i,
		futureSpreadRegex = /^_S_/i,
		shortFutureOptionRegex = /^([A-Z][A-Z0-9\$\-!\.]?)([A-Z])([0-9]{1,4})([A-Z])$/i,
		longFutureOptionRegex = /^([A-Z][A-Z0-9\$\-!\.]{0,2})([A-Z])([0-9]{1,4})\|(\-?[0-9]{1,5})(C|P)$/i,
		historicalFutureOptionRegex = /^([A-Z][A-Z0-9\$\-!\.]{0,2})([A-Z])([0-9]{2})([0-9]{1,5})(C|P)$/i,
		forexRegex = /^\^([A-Z]{3})([A-Z]{3})$/i,
		sectorRegex = /^\-(.*)$/i,
		indexRegex = /^\$(.*)$/i,
		batsRegex = /^(.*)\.BZ$/i,
		usePercentRegex = /(\.RT)$/;

	const altMonthCodes = {
		A: 'F', B: 'G', C: 'H', D: 'J', E: 'K', I: 'M', L: 'N', O: 'Q', P: 'U', R: 'V', S: 'X', T: 'Z'
	};

	function getIsType(symbol, type) {
		const instrumentType = symbolParser.parseInstrumentType(symbol);

		return instrumentType !== null && instrumentType.type === type;
	}

	function getFuturesYear(yearString) {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();

		let year = parseInt(yearString);

		if (year < 10) {
			const bump = (year < currentYear % 10) ? 1 : 0;

			year = Math.floor(currentYear / 10) * 10 + year + (bump * 10);
		} else if (year < 100) {
			year = Math.floor(currentYear / 100) * 100 + year;

			if (year < currentYear) {
				const alternateYear = year + 100;

				if (currentYear - year > alternateYear - currentYear) {
					year = alternateYear;
				}
			}
		}

		return year;
	}

	const symbolParser = {
		parseInstrumentType: (symbol) => {
			if (typeof symbol !== 'string') {
				return null;
			}

			const exchangeMatch = symbol.match(exchangeRegex);

			if (exchangeMatch !== null) {
				symbol = exchangeMatch[1];
			}

			if (futureSpreadRegex.test(symbol)) {
				return {
					symbol: symbol,
					type: 'future_spread'
				};
			}

			const staticFutureMatch = symbol.match(concreteFutureRegex);

			if (staticFutureMatch !== null) {
				return {
					symbol: symbol,
					type: 'future',
					root: staticFutureMatch[1],
					dynamic: false,
					month: staticFutureMatch[2],
					year: getFuturesYear(staticFutureMatch[3])
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

			const shortFutureOptionMatch = symbol.match(shortFutureOptionRegex);

			if (shortFutureOptionMatch !== null) {
				const currentDate = new Date();
				const currentYear = currentDate.getFullYear();
				let optionType, optionYear;

				if (shortFutureOptionMatch[4] >= 'P') {
					optionYear = currentYear + (shortFutureOptionMatch[4].charCodeAt(0) - 'P'.charCodeAt(0));
					optionType = 'put';
				} else {
					optionYear = currentYear + (shortFutureOptionMatch[4].charCodeAt(0) - 'C'.charCodeAt(0));
					optionType = 'call';
				}

				return {
					symbol: symbol,
					type: 'future_option',
					root: shortFutureOptionMatch[1],
					month: shortFutureOptionMatch[2],
					year: optionYear,
					strike: parseInt(shortFutureOptionMatch[3]),
					option_type: optionType
				};
			}

			let longFutureOptionMatch = symbol.match(longFutureOptionRegex);
			const futureOptionMatch = longFutureOptionMatch !== null ? longFutureOptionMatch : symbol.match(historicalFutureOptionRegex);

			if (futureOptionMatch !== null) {
				let month = futureOptionMatch[2];

				return {
					symbol: symbol,
					type: 'future_option',
					root: futureOptionMatch[1],
					month: altMonthCodes.hasOwnProperty(month) ? altMonthCodes[month] : month,
					year: getFuturesYear(futureOptionMatch[3]),
					strike: parseInt(futureOptionMatch[4]),
					option_type: futureOptionMatch[5] === 'C' ? 'call' : 'put'
				};
			}

			return null;
		},

		getIsConcrete: (symbol) => {
			return !symbolParser.getIsReference(symbol);
		},

		getIsReference: (symbol) => {
			return referenceFutureRegex.test(symbol);
		},

		getIsFuture: (symbol) => {
			return getIsType(symbol, 'future');
		},

		getIsFutureSpread: (symbol) => {
			return getIsType(symbol, 'future_spread');
		},

		getIsFutureOption: (symbol) => {
			return getIsType(symbol, 'future_option');
		},

		getIsForex: (symbol) => {
			return getIsType(symbol, 'forex');
		},

		getIsSector: (symbol) => {
			return getIsType(symbol, 'sector');
		},

		getIsIndex: (symbol) => {
			return getIsType(symbol, 'index');
		},

		getIsBats: (symbol) => {
			return batsRegex.test(symbol);
		},

		getProducerSymbol: (symbol) => {
			if (typeof symbol === 'string') {
				const instrumentType = symbolParser.parseInstrumentType(symbol);

				if (instrumentType !== null && instrumentType.type === 'future_option') {
					const currentDate = new Date();
					const currentYear = currentDate.getFullYear();
					let optionType = instrumentType.option_type === 'call' ? 'C' : 'P';

					optionType = String.fromCharCode(optionType.charCodeAt(0) + (instrumentType.year - currentYear));

					return instrumentType.root + instrumentType.month + instrumentType.strike + optionType;
				}

				return symbol.replace(jerqFutureConversionRegex, '$1$2$4');
			} else {
				return null;
			}
		},

		displayUsingPercent: (symbol) => {
			return usePercentRegex.test(symbol);
		}
	};

	return symbolParser;
})();