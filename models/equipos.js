const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let teamsSchema = new Schema({
    name: {
        type: String
    },
    participant: {
        type: String
    },
    animal_type: {
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
}, { collection: 'teams' });

module.exports = mongoose.model('Teams', teamsSchema)