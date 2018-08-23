const ZSchema = require('z-schema');

let zSchema = new ZSchema({
    breakOnFirstError: false,
});

/**
 * Validate request against json schema
 * @param {json} schema
 * @param {json} input
 * @return {array} Return list of errors found during validation
 */
function assertValid(schema, input) {
    let valid = zSchema.validate(input, schema);
    if (valid) {
        return [];
    }

    return zSchema.getLastErrors().map(function(data) {
        let msg = data.message;
        if (data.code === 'PATTERN') {
            msg = 'Invalid format: ' + data.params[1];
        }
        return {message: msg};
    });
}

module.exports = {
    assertValid,
};


