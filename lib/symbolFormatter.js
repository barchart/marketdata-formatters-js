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