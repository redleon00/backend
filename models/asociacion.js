const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AsociationSchema = new Schema({
    name:{
        type: String,
        default: ''
    },
    name_large:{
        type: String,
        default: ''
    },
    ovino:{
        type: Boolean,
        default: false
    },
    caprino:{
        type: Boolean,
        default: false
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
    collection: 'asociations'
  })

  module.exports = mongoose.model('Asociations', AsociationSchema) 