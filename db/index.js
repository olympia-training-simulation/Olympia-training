const { datastore } = require('nedb-promise')


const db = {}

db.users = new datastore ({
    filename: './data/users.nedb',
        autoload: true
})

require('./users')(db.users) // Init users db


module.exports = db