const stream = require('getstream');
const config = require('config')['stream']
let client = stream.connect(config.streamKey, config.streamSecret , config.streamId);

module.exports = client;
