module.exports = function () {
	'use strict';

	return function () {
		return {
			format: function (q) {
				var returnRef;

				if (q.time) {
					var t = q.time;

					if (q.lastPrice) {
						returnRef = [['00', t.getHours()].join('').substr(-2), ['00', t.getMinutes()].join('').substr(-2), ['00', t.getSeconds()].join('').substr(-2)].join(':');
					} else {
						returnRef = (t.getMonth() + 1 ) + '/' + t.getDate() + '/' + String(t.getFullYear()).substr(2);
					}
				} else {
					returnRef = '';
				}

				return returnRef;
			}
		};
	};
}();