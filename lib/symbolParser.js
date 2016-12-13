module.exports = function() {
	'use strict';

	var percentRegex = /(\.RT)$/;
	var jerqFutureConversionRegex = new RegExp('([A-Z0-9]{1,3})([A-Z]{1})([0-9]{3}|[0-9]{1})?([0-9]{1})$');

	return {
		displayUsingPercent: function(symbol) {
			return percentRegex.test(symbol);
		},

		getProducerSymbol: function(symbol) {
			var returnRef;

			if (typeof symbol === 'string') {
				returnRef = symbol.replace(jerqFutureConversionRegex, '$1$2$4');
			} else {
				returnRef = null;
			}

			return returnRef;
		}
	};
}();