module.exports = require('./accounts_common').Accounts

if (global.isClient) {
    require('./url_client')
    require('./accounts_client')
} else {
    require('./url_server')
    require('./accounts_server')
}