const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let breederSchema = new Schema({
    name:{
        type: String,
        default: ''
    },
    state:{
        type: String,
        default: ''
    },
    asociation: {
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
    collection: 'breeders'
  })

module.exports = mongoose.model('Breeders', breederSchema)