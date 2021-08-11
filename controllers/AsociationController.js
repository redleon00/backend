const mongoose = require('mongoose')
const AsociationsModel = require('../models/asociacion')
const Asociation = mongoose.model('Asociations')
const PtsAsocModel = require('../models/puntos_asoc')
const PtsAsoc = mongoose.model('PtsAsoc')
const PtsAsocOviModel = require('../models/puntos_asoc_ovi')
const PtsAsocOvi = mongoose.model('PtsAsocOvi')
const PtsAsocCapriModel = require('../models/puntos_asoc_capri')
const PtsAsocCapri = mongoose.model('PtsAsocCapri')

const register = async (req, res) => {
    try {
        const name = req.body.name.toUpperCase();
        const name_large = req.body.name_large.toUpperCase();
        const ovino = req.body.ovino;
        const caprino = req.body.caprino
        let newAsoc = new Asociation({
            name: name,
            name_large: name_large,
            ovino: ovino,
            caprino: caprino
        })
        let asoc = new PtsAsoc({
            name: name,
            ovino: ovino,
            caprino: caprino
        })
        asoc.save()
        if (ovino == true) {
            let asocOvi = new PtsAsocOvi({
                name: name
            })
            asocOvi.save()
        }

        if (caprino == true) {
            let asocCapri = new PtsAsocCapri({
                name: name
            })
            asocCapri.save()
        }
        newAsoc.save(function (err, race) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {

                return res.json({ race, message: "Asociación registrada" });
            }
        });

    } catch (error) {
        return res.status(400).send({
            message: "Ups!..Ocurrió un error"
        });
    }



}

const list = async (req, res) => {
    try {
        let asociations = await Asociation.find({ 'name': { $ne: '' } }).sort({ 'tipo': -1 }).exec();
        return res.json(asociations);
    } catch (error) {
        console.log(error)
    }
}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let dataAsoc = await Asociation.findOne({ '_id': id }).exec()
        await PtsAsoc.deleteOne({ name: dataAsoc.name }).exec()
        await PtsAsocOvi.deleteOne({ name: dataAsoc.name }).exec()
        await PtsAsocCapri.deleteOne({ name: dataAsoc.name }).exec()
        let asociations = await Asociation.deleteOne({ '_id': id }).exec();
        return res.json({ asociations, message: "Asociación eliminada" });
    } catch (error) {
        console.log(error)
        return res.json({ message: "Ups..ocurrió un error!" });
    }
}

const update = async (req, res) => {
    console.log(req.body)
    const id = req.params.id
    const name = req.body.name.toUpperCase()
    const name_large = req.body.name_large
    const ovino = req.body.ovino;
    const caprino = req.body.caprino
    try {
        let dataAsoc = await Asociation.findOne({ '_id': id }).exec()
        console.log("dataAsoc", dataAsoc.name)
        await PtsAsoc.updateOne({ name: name }, { $set: { 'name': name, 'ovino': ovino, 'caprino':caprino } }).exec()

        let existeOvi = await PtsAsocOvi.countDocuments({name: name}).exec()
        if(existeOvi > 0){
            if(ovino == false){
                await PtsAsocOvi.deleteOne({name: name}).exec()
            }else{
                await PtsAsocOvi.updateOne({ name: name }, { $set: { 'name': name } }).exec()
            }
            
        }else{
            if(ovino == true){
                let asocOvi = new PtsAsocOvi({
                    name: name
                })
                asocOvi.save()
            }
            
        }

        let existeCapri = await PtsAsocCapri.countDocuments({name: name}).exec()
        if(existeCapri > 0){
            if(caprino == false){
                await PtsAsocCapri.deleteOne({ name: name }).exec()
            }else{
                await PtsAsocCapri.updateOne({ name: name }, { $set: { 'name': name } }).exec()
            }
            
        }else{
            if(caprino == true){
                let asocCapri = new PtsAsocCapri({
                    name: name
                })
                asocCapri.save()
            }
        }
        
        let asociations = await Asociation.updateOne({ '_id': id }, { $set: { 'name': name, 'name_large': name_large, 'ovino': ovino, 'caprino':caprino, updated_at: new Date() } }).exec();
        return res.json({ message: "Asociación actualizada" });
    } catch (error) {
        console.log(error)
        return res.json({ message: "Ups..ocurrió un error!" });
    }
}
module.exports = { register, list, deleted, update }