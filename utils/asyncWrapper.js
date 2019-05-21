module.exports.catchError = catchError


/**
 * Catch error in async function and call callback if provided (last argument only)
 */
function catchError (fn) {
    return async function errorCatcher (...args) {
        var cb = args[args.length - 1]
        if (typeof cb != 'function') cb = undefined

        try {
            const ret = await fn(...args)
            if (cb) cb(undefined, ret)
            else return ret
        } catch (err) {
            if (cb) return cb(err)
            else throw err
        }
    }
}