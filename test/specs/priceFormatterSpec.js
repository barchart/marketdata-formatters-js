var PriceFormatter = require('../../lib/priceFormatter');

describe('When a price formatter is created', function() {
    var priceFormatter;

    describe('with a decimal fraction separator', function() {
        beforeEach(function() {
            priceFormatter = new PriceFormatter('.');
        });

        it('formats 377 (with unit code 2) as "3.7700"', function() {
            expect(priceFormatter.format(377, '2')).toEqual('3.7700');
        });

        it('formats 377.5 (with unit code 2) as "3.7750"', function() {
            expect(priceFormatter.format(377.5, '2')).toEqual('3.7750');
        });

        it('formats 377.75 (with unit code 2) as "3.7775"', function() {
            expect(priceFormatter.format(377.75, '2')).toEqual('3.7775');
        });

        it('formats undefined (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(undefined, '2')).toEqual('');
        });

        it('formats null (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(null, '2')).toEqual('');
        });

        it('formats Number.NaN (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
        });
    });

    describe('with a dash fraction separator and no special fractions', function() {
        beforeEach(function() {
            priceFormatter = new PriceFormatter('-', false);
        });

        it('formats 123 (with unit code 2) as "123-0"', function() {
            expect(priceFormatter.format(123, '2')).toEqual('123-0');
        });

        it('formats 123.5 (with unit code 2) as "123-4"', function() {
            expect(priceFormatter.format(123.5, '2')).toEqual('123-4');
        });

        it('formats 0.5 (with unit code 2) as "0-4"', function() {
            expect(priceFormatter.format(0.5, '2')).toEqual('0-4');
        });

        it('formats 0 (with unit code 2) as "0-0"', function() {
            expect(priceFormatter.format(0, '2')).toEqual('0-0');
        });

        it('formats zero-length string (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format('', '2')).toEqual('');
        });

        it('formats undefined (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(undefined, '2')).toEqual('');
        });

        it('formats null (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(null, '2')).toEqual('');
        });

        it('formats Number.NaN (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
        });
    });

    describe('with a tick fraction separator and no special fractions', function() {
        beforeEach(function() {
            priceFormatter = new PriceFormatter('\'', false);
        });

        it('formats 123 (with unit code 2) as "123\'0"', function() {
            expect(priceFormatter.format(123, '2')).toEqual('123\'0');
        });

        it('formats 123.5 (with unit code 2) as "123\'4"', function() {
            expect(priceFormatter.format(123.5, '2')).toEqual('123\'4');
        });

        it('formats 0.5 (with unit code 2) as "0\'4"', function() {
            expect(priceFormatter.format(0.5, '2')).toEqual('0\'4');
        });

        it('formats 0 (with unit code 2) as "0\'0"', function() {
            expect(priceFormatter.format(0, '2')).toEqual('0\'0');
        });

        it('formats zero-length string (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format('', '2')).toEqual('');
        });

        it('formats undefined (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(undefined, '2')).toEqual('');
        });

        it('formats null (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(null, '2')).toEqual('');
        });

        it('formats Number.NaN (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
        });
    });

    describe('with no fraction separator and no special fractions', function() {
        beforeEach(function() {
            priceFormatter = new PriceFormatter('', false);
        });

        it('formats 123 (with unit code 2) as "1230"', function() {
            expect(priceFormatter.format(123, '2')).toEqual('1230');
        });

        it('formats 123.5 (with unit code 2) as "1234"', function() {
            expect(priceFormatter.format(123.5, '2')).toEqual('1234');
        });

        it('formats 0.5 (with unit code 2) as "4"', function() {
            expect(priceFormatter.format(0.5, '2')).toEqual('4');
        });

        it('formats 0 (with unit code 2) as "0"', function() {
            expect(priceFormatter.format(0, '2')).toEqual('0');
        });

        it('formats zero-length string (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format('', '2')).toEqual('');
        });

        it('formats undefined (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(undefined, '2')).toEqual('');
        });

        it('formats null (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(null, '2')).toEqual('');
        });

        it('formats Number.NaN (with unit code 2) as zero-length string', function() {
            expect(priceFormatter.format(Number.NaN, '2')).toEqual('');
        });
    });
});