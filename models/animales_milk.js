const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);

let AnimalsMilkSchema = new Schema({
    name: {
        type: String
    },
    sex: {
        type: String
    },
    birthday: {
        type: Date
    },
    type: {
        type: String // Oveja o Cabra
    },
    race: {
        type: String
    },
    category: {
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
    ID_team: {
        type: String
    },
    register: {
        type: String,
    },
    tatoo: {
        type: String
    },
    asociation: {
        type: String
    },
    best_tits: {
        type:Boolean,
        default: false
    },
    milker: {
        type: Boolean,
        default: false
    },
    animalAll_id: {
        type: String
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
    collection: 'animals_milk'
})

module.exports = mongoose.model('AnimalsMilk', AnimalsMilkSchema)