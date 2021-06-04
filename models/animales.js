const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let animalsSchema = new Schema({
  name: {
    type: String
  },
  sex: {
    type: String
  },
  race: {
    type: String
  },
  category: {
    type: String
  },
  subcategory: {
    type: String
  },
  owner: {
    type: String
  },
  breeder: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  status_championship: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  },

}, {
  collection: 'animals'
})

module.exports = mongoose.model('Animals', animalsSchema)