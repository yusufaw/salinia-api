const mongoose = require('../lib/db');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
  content: String,
}, {
  toJSON: {
    transform(doc, ret) {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      /* eslint no-underscore-dangle: ["error", { "allow": ["__v", "_id"] }] */
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Note', schema);
