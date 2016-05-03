module.exports = function() {
	'use strict';

	return function(useTwelveHourClock) {
		var formatTime;

		if (useTwelveHourClock) {
			formatTime = formatTwelveHourTime;
		} else {
			formatTime = formatTwentyFourHourTime;
		}

		return {
			format: function(q) {
				var returnRef;

				if (q.time) {
					var t = q.time;

					if (q.lastPrice && !q.flag) {
						returnRef = formatTime(t);
					} else {
						returnRef = [leftPad(t.getMonth() + 1), leftPad(t.getDate()), leftPad(t.getFullYear())].join('/');
					}
				} else {
					returnRef = '';
				}

				return returnRef;
			}
		};
	};

	function formatTwelveHourTime(t) {
		var hours = t.getHours();
		var period;

		if (hours === 0) {
			hours = 12;
			period = 'AM';
		} else if (hours > 12) {
			hours = hours - 12;
			period = 'PM';
		} else {
			hours = hours;
			period = 'AM';
		}

		return [leftPad(hours), leftPad(t.getMinutes()), leftPad(t.getSeconds())].join(':');
	}

	function formatTwentyFourHourTime(t) {
		return [leftPad(t.getHours()), leftPad(t.getMinutes()), leftPad(t.getSeconds())].join(':');
	}

	function leftPad(value) {
		return ['00', value].join('').substr(-2);
	}
}();