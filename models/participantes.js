const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let participanSchema = new Schema({
    name:{
        type: String,
        default: ''
    },
    state:{
        type: String,
        default: ''
    },
    owner: {
        type: Boolean,
        default: true
    },
    breeder: {
        type: Boolean,
        default: true
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
    collection: 'participants'
  })

module.exports = mongoose.model('Participants', participanSchema)