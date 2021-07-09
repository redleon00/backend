const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);

let animalsAllSchema = new Schema({
  name: {
    type: String
  },
  sex: {
    type: String
  },
  birthday: {
    type: Date
  },
  type:{
    type: String // Oveja o Cabra
  },
  race: {
    type: String
  },
  owner: {
    type: String
  },
  breeder: {
    type: String
  },
  register:{
    type: String,
  },
  tatoo:{
    type: String
  },
  asociation:{
    type: String
  },
  status: {
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
  collection: 'animals_all'
})

module.exports = mongoose.model('AnimalsAll', animalsAllSchema)