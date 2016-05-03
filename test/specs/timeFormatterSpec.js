var timeFormatter = require('../../lib/timeFormatter');

describe('When a time formatter is created (without specifying the clock)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter();
	});

	describe('and a quote is formatted (with no "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "00:00:00"', function() {
				expect(tf.format(quote)).toEqual('00:00:00');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08:09"', function() {
				expect(tf.format(quote)).toEqual('07:08:09');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "13:08:09"', function() {
				expect(tf.format(quote)).toEqual('13:08:09');
			});
		});
	});

	describe('and a quote is formatted (with with a "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456,
				flag: 'p'
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});
	});
});

describe('When a time formatter is created (and a 24-hour clock is specified)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter(false);
	});

	describe('and a quote is formatted (with no "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "00:00:00"', function() {
				expect(tf.format(quote)).toEqual('00:00:00');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08:09"', function() {
				expect(tf.format(quote)).toEqual('07:08:09');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "13:08:09"', function() {
				expect(tf.format(quote)).toEqual('13:08:09');
			});
		});
	});

	describe('and a quote is formatted (with with a "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456,
				flag: 'p'
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});
	});
});

describe('When a time formatter is created (and a 12-hour clock is specified)', function() {
	var tf;

	beforeEach(function() {
		tf = timeFormatter(true);
	});

	describe('and a quote is formatted (with no "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is five after midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 5, 0);
			});

			it('the formatter outputs "12:05:00"', function() {
				expect(tf.format(quote)).toEqual('12:05:00');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "12:00:00"', function() {
				expect(tf.format(quote)).toEqual('12:00:00');
			});
		});

		describe('and the quote time is ten after noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 10, 0);
			});

			it('the formatter outputs "12:10:00"', function() {
				expect(tf.format(quote)).toEqual('12:10:00');
			});
		});

		describe('and the quote time is 7:08:09 AM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 7, 8, 9);
			});

			it('the formatter outputs "07:08:09"', function() {
				expect(tf.format(quote)).toEqual('07:08:09');
			});
		});

		describe('and the quote time is 1:08:09 PM on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 13, 8, 9);
			});

			it('the formatter outputs "01:08:09"', function() {
				expect(tf.format(quote)).toEqual('01:08:09');
			});
		});
	});

	describe('and a quote is formatted (with with a "flag" and a "lastPrice" value)', function() {
		var quote;

		beforeEach(function() {
			quote = {
				lastPrice: 123.456,
				flag: 'p'
			};
		});

		describe('and the quote time is midnight on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 0, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});

		describe('and the quote time is noon on May 3, 2016', function() {
			beforeEach(function() {
				quote.time = new Date(2016, 4, 3, 12, 0, 0);
			});

			it('the formatter outputs "05/03/16"', function() {
				expect(tf.format(quote)).toEqual('05/03/16');
			});
		});
	});
});