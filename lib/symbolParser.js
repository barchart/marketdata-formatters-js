module.exports = function() {
	'use strict';

	var percentRegex = /(\.RT)$/;

	return {
		displayUsingPercent: function(symbol) {
			return percentRegex.test(symbol);
		}
	};
}();