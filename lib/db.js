const mongoose = require('mongoose');

const connection = process.env.MONGO_URL + process.env.SALINIA_DB;
mongoose.connect(connection, (err) => {
  if (err) {
    /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
    console.error(err);
  } else {
    console.log('connected to mongodb');
  }
});
mongoose.set('debug', true);

module.exports = mongoose;
