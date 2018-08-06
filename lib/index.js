const convert = require('./convert'),
	decimalFormatter = require('./decimalFormatter'),
	messageParser = require('./messageParser'),
	monthCodes = require('./monthCodes'),
	priceFormatter = require('./priceFormatter'),
	symbolFormatter = require('./symbolFormatter'),
	symbolParser = require('./symbolParser'),
	priceParser = require('./priceParser'),
	stringToDecimalFormatter = require('./stringToDecimalFormatter'),
	timeFormatter = require('./timeFormatter'),
	timestampParser = require('./timestampParser');

module.exports = (() => {
	'use strict';

	return {
		convert: convert,
		decimalFormatter: decimalFormatter,
		monthCodes: monthCodes,
		messageParser: messageParser,
		priceFormatter: priceFormatter,
		symbolParser: symbolParser,
		priceParser: priceParser,
		stringToDecimalFormatter: stringToDecimalFormatter,
		symbolFormatter: symbolFormatter,
		timeFormatter: timeFormatter,
		timestampParser: timestampParser
	};
})();