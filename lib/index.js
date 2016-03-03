var priceFormatter = require('./priceFormatter');
var timeFormatter = require('./timeFormatter');

module.exports = function() {
	'use strict';

	return {
		priceFormatter: priceFormatter,
		timeFormatter: timeFormatter
	};
}();