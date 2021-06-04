const mongoose= require('mongoose')
const RaceModel = require('../models/raza')
const Race = mongoose.model('Races')

const register = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const type = req.body.tp;
     
        let newRace = new Race({
            name : name, 
            tipo : type        
        })
        newRace.save(function(err, race) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
            
                return res.json({race, message: "Raza registrada"});
            }
        });


}

const list =   async (req, res) => {
    try {
        let races = await Race.find({'name':{$ne : ''}}).exec();
        return res.json(races);    
    } catch (error) {
        console.log(error)
    }
}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let races = await Race.deleteOne({ '_id': id }).exec();
        return res.json({ races, message: "Raza eliminada" });    
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
    const type = req.body.tp
try {
    let races = await Race.updateOne({ '_id': id },{ $set :{'name': name, 'tipo': type, updated_at: new Date() } }).exec();
    return res.json({ races, message: "Raza actualizada" });    
} catch (error) {
    console.log(error)
}
}
module.exports = {register, list, deleted, update}