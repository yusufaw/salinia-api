const mongoose = require('../lib/db');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;
const schema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  photo: String,
  provider: [{
    type: Schema.Types.ObjectId,
    ref: 'PredefinedArea',
  }],
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
}, {
  toJSON: {
  /* eslint no-param-reassign: ["error", { "props": false }] */
  /* eslint no-underscore-dangle: ["error", { "allow": ["__v", "_id"] }] */
    transform(doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', schema);
