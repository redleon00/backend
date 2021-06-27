const mongoose= require('mongoose')
const AsociationsModel = require('../models/asociacion')
const Asociation = mongoose.model('Asociations')

const register = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const name_large = req.body.name_large.toUpperCase();
     
        let newAsoc = new Asociation({
            name : name, 
            name_large : name_large        
        })
        newAsoc.save(function(err, race) {
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
        let asociations = await Asociation.find({'name':{$ne : ''}}).sort({'tipo':-1}).exec();
        return res.json(asociations);    
    } catch (error) {
        console.log(error)
    }
}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let asociations = await Asociation.deleteOne({ '_id': id }).exec();
        return res.json({ asociations, message: "Asociación eliminada" });    
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
    const name_large = req.body.name_large.toUpperCase()
try {
    let asociations = await Asociation.updateOne({ '_id': id },{ $set :{'name': name, 'name_large': name_large, updated_at: new Date() } }).exec();
    return res.json({ races, message: "Asociación actualizada" });    
} catch (error) {
    console.log(error)
}
}
module.exports = {register, list, deleted, update}