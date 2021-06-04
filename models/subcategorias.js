const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subcategorySchema = new Schema({
    name:{
        type: String,
        default: ''
    },
    category:{
        type: String,
        default: ''
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
    collection: 'subcategory'
})
module.exports = mongoose.model('Subcategorys', subcategorySchema) 