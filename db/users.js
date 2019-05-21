module.exports = function (db) {


const assert = require('assert')

const { type, string, hash, asyncWrapper } = require('../utils')


db.createUser = asyncWrapper.catchError(createUser)
db.saveUser = asyncWrapper.catchError(saveUser)



/**
 * @typedef {Object} UserInfo
 * @property {string} name - User's real name
 * @property {string} [password=''] - Password hash
 * @property {boolean} [isAdmin=false] - User is admin or not
 */

/**
 * @typedef {Object} UserObject
 * @property {string} _id - Document id
 * @property {string} name - Name of user
 * @property {string} password - User's password hash
 * @property {boolean} [isAdmin=false] - User is admin or not
 */



// ---------------------------------
// ---------- CREATE user ----------
// ---------------------------------


/**
 * @callback createUserCallback
 * @param {error} err - Error if occured
 * @param {UserInfo} userInfo - User object. If error occured, userInfo = undefined
 */
/**
 * Create a new user object
 * 
 * @param {UserInfo} initInfo - Information to init user object
 * @param {createUserCallback} [callback] - Callback
 * @param {createUserCallback} [callback] - Callback
 * 
 */
async function createUser (initInfo, callback) {
    const userInfo = {}

    const userName = type.verifyType(initInfo.name, String).trim()
    userInfo.name = string.capitalize(userName)

    const userPassword = type.verifyType(initInfo.password, String)
    if (userPassword) userInfo.password = await hash.createHash(userPassword)
    else userInfo.password = ''

    userInfo.isAdmin = type.verifyType(initInfo.isAdmin, Boolean) // Default is false
    
    return userInfo
}



/**
 * @callback saveUserCallback
 * @param {Error} err - Error if occured
 * @param {UserInfo} user - User object inserted into database, including _id field. If error occured, user = undefined
 */
/**
 * Save a user into database
 * 
 * @param {UserInfo} user - User to save 
 * @param {saveUserCallback} callback - Callback
 * @returns {UserObject} User document in database (have additional `_id` field) 
 */
async function saveUser (user, callback) {
    const userInfo = {}

    // Check name: not empty, not used
    const userName = type.verifyType(user.name, String).trim()
    assert.ok(userName, "User's name cannot be empty")
    
    const nameUsed =  Object.keys(await db.find({ name: userName })).length
    assert.ok(!nameUsed, "Name has been taken")

    userInfo.name = userName


    // Check password: not empty, is valid bcrypt hash
    const userPassword = type.verifyType(user.password, String).trim()
    assert.ok(userPassword, "Password cannot be empty")
    assert.ok(hash.isValidHash(userPassword), "Password hash is invalid")

    userInfo.password = userPassword


    // Is admin or not
    const isAdmin = type.verifyType(userInfo.isAdmin, Boolean)

    userInfo.isAdmin = isAdmin

    
    const userDoc = await db.insert(userInfo)

    return userDoc
}



// ---------------------------------
// ----------- READ user -----------
// ---------------------------------



// ---------------------------------
// ---------- UPDATE user ----------
// ---------------------------------



// ---------------------------------
// ---------- DELETE user ----------
// ---------------------------------



}