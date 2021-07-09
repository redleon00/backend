const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let resultOrdenoSchema = new Schema({
    id_competencia:{
        type:String
    },
    name_competencia:{
        type:String
    },
    sex:{
        type:String
    },
    type_animal:{
        type:String
    },
    id_animal:{
        type:String
    },
    animal:{
        type:Object
    },
    firts_point:{
        type:Number,
        default:0
    },
    second_point:{
        type:Object
    },
    third_point:{
        type:Number,
        default:0
    },
    four_point:{
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
    collection: 'resultsOrdeno'
  })

module.exports = mongoose.model('ResultsOrdeno', resultOrdenoSchema)