const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ptsExpoCapriSchema = new Schema({
    participant:{
        type:String
    },
    team:{
        type:String
    },
    primero_category:{
        type:Number,
        default:0
    },
    segundo_category:{
        type:Number,
        default:0
    },
    tercero_category:{
        type:Number,
        default:0
    },
    menor:{
        type:Number,
        default:0
    },
    joven:{
        type:Number,
        default:0
    },
    adulto:{
        type:Number,
        default:0
    },
    raza:{
        type:Number,
        default:0
    },
    reservado:{
        type:Number,
        default:0
    },
    ordeno:{
        type:Number,
        default:0
    },
    ubre:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default: new Date()
    },
    updated_at:{
        type:Date,
        default: new Date()
    }

}, { collection: 'ptsexpocapri' })

module.exports = mongoose.model('PtsExpoCapri', ptsExpoCapriSchema)