const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let competenciasExSchema =  new Schema ({
    class:{ //de Exhibicion o Puntuado
        type : String
    },
    type_comp:{
        type: String //Categoria, Grupo, Raza, Supremo
    },
    name:{
        type: String
    },
    type_animal:{
        type: String
    },
    sex:{
        type:String
    },
    race:{
        type: String
    },
    category:{
        type: String
    },
    group:{
        type: String // Menor, Joven, Adulto
    },
    pts_first:{
        type: Number,
        default: 0
    },
    pts_second:{
        type: Number,
        default: 0
    },
    pts_third:{
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: true
    },
    created_at:{
        type: Date,
        default: new Date()
    },
    updated_at:{
        type: Date,
        default: new Date()
    } 
}, { collection: 'competitionsEx' })
module.exports = mongoose.model('CompetitionsEx', competenciasExSchema)