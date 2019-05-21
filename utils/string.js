module.exports.capitalize = capitalize


/**
 * Capitalize a string
 * 
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 * 
 * @example
 *      capitalize('capitalize this') -> 'Capitalize This'
 */
function capitalize (str) {
    const words = str.split(' ').filter(word => word) // Remove empty words
    const capitalizedWords = words.map(
        word => word[0].toUpperCase() + word.slice(1).toLowerCase()
    )
    return capitalizedWords.join(' ')
}