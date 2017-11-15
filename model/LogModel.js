const mongoose = require('../lib/db');
const mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    created_at: {
      type: Date,
      default: new Date()
    },
    updated_at: {
      type: Date,
      default: new Date()
    },
    content: String,
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Log', schema);
