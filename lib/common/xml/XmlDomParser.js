const parser = require('fast-xml-parser');

module.exports = (() => {
    'use strict';

    class XmlDomParser  {
        constructor() {

        }

		parse(textDocument) {
			if (typeof textDocument !== 'string') {
				throw new Error('The "textDocument" argument must be a string.');
			}

			return parser.parse(textDocument);
		}

        _parse(textDocument) {
            return this._xmlDomParser.parseFromString(textDocument);
        }

        toString() {
            return '[XmlDomParser]';
        }
    }

    return XmlDomParser;
})();