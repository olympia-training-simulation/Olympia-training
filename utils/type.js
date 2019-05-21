module.exports.verifyType = verifyType

/**
 * Verify if value is of expected type or not
 * 
 * @param {*} value - Value to check
 * @param {function} Type - Function to create new value of that type
 * @param {*} [defaultValue] - Default value. If ommited, defaultValue = new Type().valueOf()
 * @return {*} Return `value` if `value` is type `Type`, otherwise return defaultValue
 * 
 * @example
 *      verifyType('abc', String) -> 'abc'
 *      verifyType('abc', Number) -> ''
 */
function verifyType (value, Type, defaultValue) {
    if (typeof value === typeof new Type().valueOf()) return value
    else
        if (defaultValue === undefined) return new Type().valueOf()
        else return defaultValue
}