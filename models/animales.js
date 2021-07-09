const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);

let animalsSchema = new Schema({
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
  team: {
    type: String
  },
  ID_team:{
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
  group:{
    type: String
  },
  animalAll_id:{
    type:String
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