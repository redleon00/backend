const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let raceSchema = new Schema({
    tipo:{
        type: String,
        default: ''
    },
    name:{
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

},{
    collection: 'races'
  })

  module.exports = mongoose.model('Races', raceSchema) 