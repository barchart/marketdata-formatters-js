module.exports = function() {
	'use strict';

	return function(useTwelveHourClock, short) {
		var formatter;

		if (useTwelveHourClock) {
			if (short) {
				formatter = formatTwelveHourTimeShort;
			} else {
				formatter = formatTwelveHourTime;
			}
		} else {
			if (short) {
				formatter = formatTwentyFourHourTimeShort;
			} else {
				formatter = formatTwentyFourHourTime;
			}
		}

		var formatTime = function(q, t) {
			var returnRef;

			if (t) {
				if (q.lastPrice && !q.flag) {
					returnRef = formatter(t);

					if (q.timezone) {
						returnRef = returnRef + ' ' + q.timezone;
					}
				} else {
					returnRef = leftPad(t.getMonth() + 1) + '/' + leftPad(t.getDate()) + '/' + leftPad(t.getFullYear());
				}
			} else {
				returnRef = '';
			}

			return returnRef;
		};

		return {
			format: function(q) {
				return formatTime(q, q.time);
			},

			formatTradeTime: function(q) {
				return formatTime(q, q.tradeTime);
			}
		};
	};

	function formatTwelveHourTime(t) {
		var hours = t.getHours();
		var period;

		if (hours === 0) {
			hours = 12;
			period = 'AM';
		} else if (hours === 12) {
			hours = hours;
			period = 'PM';
		} else if (hours > 12) {
			hours = hours - 12;
			period = 'PM';
		} else {
			hours = hours;
			period = 'AM';
		}

		return leftPad(hours) + ':' + leftPad(t.getMinutes()) + ':' + leftPad(t.getSeconds()) + ' ' + period;
	}

	function formatTwelveHourTimeShort(t) {
		var hours = t.getHours();
		var period;

		if (hours === 0) {
			hours = 12;
			period = 'A';
		} else if (hours === 12) {
			hours = hours;
			period = 'P';
		} else if (hours > 12) {
			hours = hours - 12;
			period = 'P';
		} else {
			hours = hours;
			period = 'A';
		}

		return leftPad(hours) + ':' + leftPad(t.getMinutes()) + period;
	}

	function formatTwentyFourHourTime(t) {
		return leftPad(t.getHours()) + ':' + leftPad(t.getMinutes()) + ':' + leftPad(t.getSeconds());
	}

	function formatTwentyFourHourTimeShort(t) {
		return leftPad(t.getHours()) + ':' + leftPad(t.getMinutes());
	}

	function leftPad(value) {
		return ('00' + value).substr(-2);
	}
}();