'use strict';

const mongoose = require('mongoose');

const connection = process.env.MONGO_URL + process.env.SALINIA_DB;
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
