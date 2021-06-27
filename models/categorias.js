const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    name:{
        type: String,
        default: ''
    },
    min:{
        type: Number,
        default: 0
    },
    max:{
        type: Number,
        default: 0
    },
    exhibition:{
        type: Boolean
    },
    group:{
        type: String
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
    collection: 'category'
})
module.exports = mongoose.model('Categorys', categorySchema) 