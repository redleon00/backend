const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let resultREXSchema = new Schema({
    id_competencia:{
        type:String
    },
    name_competencia:{
        type:String
    },
    sex:{
        type:String
    },
    race:{
        type:String
    },
    category:{
        type:String
    },
    type_animal:{
        type:String
    },
    firts_animal:{
        type:Object
    },
    second_animal:{
        type:Object
    },
    third_animal:{
        type:Object
    },
    firts_point:{
        type:Number,
        default:0
    },
    second_point:{
        type:Number,
        default:0
    },
    third_point:{
        type:Number,
        default:0
    },
    status:{
        type:Boolean,
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
    collection: 'resultsREX'
  })

module.exports = mongoose.model('ResultsREX', resultREXSchema)