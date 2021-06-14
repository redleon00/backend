const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let competenciasSchema =  new Schema ({
    name:{
        type: String
    },
    sex:{
        type:String
    },
    category:{
        type: String
    },
    subcategoy:{
        type: String
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
}, { collection: 'competitions' })
module.exports = mongoose.model('Competitions', competenciasSchema)