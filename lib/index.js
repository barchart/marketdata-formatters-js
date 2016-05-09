var priceFormatter = require('./priceFormatter');
var symbolFormatter = require('./symbolFormatter');
var timeFormatter = require('./timeFormatter');

module.exports = function() {
	'use strict';

	return {
		priceFormatter: priceFormatter,
		symbolFormatter: symbolFormatter,
		timeFormatter: timeFormatter
	};
}();