# @barchart/marketdata-utilities-js
## JavaScript library for working with Barchart's DDF messages

This library provides common code for parsing and interpreting DDF messages (a proprietary, string-based protocol used for market data messages). The library is intended for use in client (i.e. browser) and server (i.e. Node.js) environments. However, since the source code uses ES6, some assembly may be required for browser use (e.g. polyfills, transpilation, etc).

## Documentation

[JSDoc](http://usejsdoc.org/) is used to document the source code. HTML documentation can be generated (into a "docs" folder), as follows:

	> gulp document

## Package Managers

	> npm install @barchart/marketdata-utilities-js -S

## Unit Testing

Execute the [Jasmine](https://jasmine.github.io/) unit tests, as follows:

	> gulp test