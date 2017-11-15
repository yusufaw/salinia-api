const mongoose = require('../lib/db');
const mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    added_at: Date,
    content: String,
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Log', schema);
