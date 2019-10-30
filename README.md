# @barchart/marketdata-utilities-js
## JavaScript library for parsing and interpreting Barchart's DDF protocol

## Deprecation

This library is deprecated. It has been subsumed by [@barchart/marketdata-api-js](https://github.com/barchart/marketdata-api-js) -- as of major version 4. Please upgrade as soon as possible.

### Upgrade Instructions

Install the new library, as follows:

```
npm install @barchart/marketdata-api-js -S
```

All utilities (from this project) can now be found here:

@barchart/marketdata-api-js/lib/utilities

### Upgrade Comments

* Object and function names have been changed slightly; however, it shouldn't be too difficult to resolve.
* In this library, we often exported JavaScript objects which wrapped functions. After the upgrade, we attempt to export plain functions. For example:
  * old: module.exports = { format: function(x) { } }
  * new: module.exports = format(x) { }
* Factory functions to build price and date/time formatters still exist (which use closures to store defaults). See the following:
  * /lib/utilities/format/factories/price.js
  * /lib//utilities/format/factories/quote.js



