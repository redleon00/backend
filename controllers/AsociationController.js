const mongoose= require('mongoose')
const AsociationsModel = require('../models/asociacion')
const Asociation = mongoose.model('Asociations')
const PtsAsocModel = require('../models/puntos_asoc')
const PtsAsoc = mongoose.model('PtsAsoc')
const PtsAsocOviModel = require('../models/puntos_asoc_ovi')
const PtsAsocOvi = mongoose.model('PtsAsocOvi')
const PtsAsocCapriModel = require('../models/puntos_asoc_capri')
const PtsAsocCapri = mongoose.model('PtsAsocCapri')

const register = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const name_large = req.body.name_large.toUpperCase();
        let newAsoc = new Asociation({
            name : name, 
            name_large : name_large        
        })
        let asoc = new PtsAsoc({
            name : name
        })
        let asocOvi = new PtsAsocOvi({
            name : name
        })
        let asocCapri = new PtsAsocCapri({
            name : name
        })
        asoc.save()
        asocOvi.save()
        asocCapri.save()

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
        let dataAsoc = await Asociation.findOne({'_id': id}).exec()
        await PtsAsoc.deleteOne({name:dataAsoc.name}).exec()
        await PtsAsocOvi.deleteOne({name:dataAsoc.name}).exec()
        await PtsAsocCapri.deleteOne({name:dataAsoc.name}).exec()
        let asociations = await Asociation.deleteOne({ '_id': id }).exec();
        return res.json({ asociations, message: "Asociación eliminada" });    
    } catch (error) {
        console.log(error)
        return res.json({ message: "Ups..ocurrió un error!"});
    }
}

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
    const name_large = req.body.name_large.toUpperCase()
try {
    let dataAsoc = await Asociation.findOne({'_id': id}).exec()
    await PtsAsoc.UpdateOne({name:dataAsoc.name},{$set:{'name':name}}).exec()
    await PtsAsocOvi.UpdateOne({name:dataAsoc.name},{$set:{'name':name}}).exec()
    await PtsAsocCapri.UpdateOne({name:dataAsoc.name},{$set:{'name':name}}).exec()
    let asociations = await Asociation.updateOne({ '_id': id },{ $set :{'name': name, 'name_large': name_large, updated_at: new Date() } }).exec();
    return res.json({ races, message: "Asociación actualizada" });    
} catch (error) {
    console.log(error)
    return res.json({ message: "Ups..ocurrió un error!"});
}
}
module.exports = {register, list, deleted, update}