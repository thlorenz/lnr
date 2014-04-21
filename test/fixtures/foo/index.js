var assetsPath = require.resolve('assets');
delete require.cache[assetsPath];

module.exports = require('assets');
