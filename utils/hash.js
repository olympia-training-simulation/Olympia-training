const bcrypt = require('bcrypt')

module.exports.createHash = createHash
module.exports.isValidHash = isValidHash


/**
 * Create bcrypt hash for a string
 * 
 * @param {string} str - String to hash
 * @returns {string} Hash result of `string`
 */
async function createHash (str) {
    const saltRounds = 10
    
    const hash = await bcrypt.hash(str, saltRounds)

    return hash
}


/**
 * Check if a hash is valid bcrypt hash
 * 
 * @param {string} hash - Hash to check
 * @returns {boolean} Hash is a valid hash or not
 */
function isValidHash (hash) {
    const lengthOK = hash.length == 60
    const charOK = !(hash.match(/[^\.\/A-Za-z0-9\$]/))

    return lengthOK && charOK
}