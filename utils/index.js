const fs = require('fs')
const { basename } = require('path')


const currentModuleName = basename(__filename)
fs.readdirSync(__dirname).forEach(function exportModule (fileName) {
    const moduleName = basename(fileName).split('.')[0]

    if (moduleName != currentModuleName)
        module.exports[moduleName] = require('./' + moduleName)
})