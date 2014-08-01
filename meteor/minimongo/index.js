//add files
require('./minimongo')
require('./wrap_transform')
require('./helpers')
require('./selector')
require('./sort')
require('./projection')
require('./modify')
require('./diff')
require('./id_map')
require('./observe')
require('./objectid')

if (global.isServer) {
    require('./selector_projection')
    require('./selector_modifier')
    require('./sorter_projection')
}

module.exports = require('./minimongo')