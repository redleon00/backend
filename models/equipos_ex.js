const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let teamsSchema = new Schema({
    name: {
        type: String
    },
    participant: {
        type: String
    },
    type: { //OVINO-CAPRINO
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
}, { collection: 'teamsEx' });

module.exports = mongoose.model('TeamsEx', teamsSchema)