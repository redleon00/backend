const mongoose = require('mongoose')
const AnimalAllModel = require('../models/animales_all')
const AnimalAll = mongoose.model('AnimalsAll')
const AnimalExModel = require('../models/animales_ex')
const AnimalEx = mongoose.model('AnimalsEx')
const TeamExModel = require('../models/equipos_ex')
const TeamEx = mongoose.model('TeamsEx')
const ParticipantModel = require('../models/participantes')
const Participant = mongoose.model('Participants')
const AnimalModel = require('../models/animales')
const Animal = mongoose.model('Animals')
const TeamModel = require('../models/equipos').default
const Team = mongoose.model('Teams')

const list = async (req, res) => {
    try {
        let animals = await AnimalAll.find({}).exec();
        //console.log(animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}
const listCapri = async (req, res) => {
    try {
        let animals = await AnimalAll.find({type:'CAPRINO'}).exec();
        //console.log(animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let animal = await AnimalAll.deleteOne({ '_id': id }).exec();
                     await AnimalEx.deleteOne({ 'animalAll_id': id }).exec();   
                     await Animal.deleteOne({ 'animalAll_id': id }).exec();   
        return res.json({ message: "Animal eliminado" });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {list, deleted, listCapri}