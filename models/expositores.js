const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let expositorSchema = new Schema({
    name:{
        type: String,
        default: ''
    },
    state:{
        type: String,
        default: ''
    },
    status:{
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
    collection: 'expositors'
  })

module.exports = mongoose.model('Expositors', expositorSchema)