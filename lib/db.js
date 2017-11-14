'use strict';

const config = require('./config');
const mongoose = require('mongoose');
const mongoConfig = config.db();

const connection = mongoConfig.connection + mongoConfig.database;
console.log(connection);
mongoose.connect(connection, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to mongodb');
    }
});
mongoose.set('debug', true);

module.exports = mongoose;
