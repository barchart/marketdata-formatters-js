module.exports = function() {
	'use strict';

	return function(value, digits, thousandsSeparator) {
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