const mongoose = require('mongoose')
const CompetitionModel = require('../models/competencias')
const Competition = mongoose.model('Competitions')
const ResultCModel = require('../models/resultsCategory')
const ResultsC = mongoose.model('ResultsC')
const ResultGModel = require('../models/resultsGroup')
const ResultsG = mongoose.model('ResultsG')
const ResultRModel = require('../models/resultsRace')
const ResultsR = mongoose.model('ResultsR')
const ResultSModel = require('../models/resultsSupreme')
const ResultsS = mongoose.model('ResultsS')

const PuntosExpoOviModel = require('../models/puntos_expo_ovino')
const PuntosExpoOvi = mongoose.model('PtsExpoOvi')
const PuntosExpoCapriModel = require('../models/puntos_expo_caprino')
const PuntosExpoCapri = mongoose.model('PtsExpoCapri')

const PuntosCriaOviModel = require('../models/puntos_criador_ovino')
const PuntosCriaOvi = mongoose.model('PtsCriaOvi')
const PuntosCriaCapriModel = require('../models/puntos_criador_caprino')
const PuntosCriaCapri = mongoose.model('PtsCriaCapri')

const PuntosAsocModel = require('../models/puntos_asoc')
const PuntosAsoc = mongoose.model('PtsAsoc')

const PuntosAsocOviModel = require('../models/puntos_asoc_ovi')
const PuntosAsocOvi = mongoose.model('PtsAsocOvi')
const PuntosAsocCapriModel = require('../models/puntos_asoc_capri')
const PuntosAsocCapri = mongoose.model('PtsAsocCapri')

const listCategoria = async (req, res) => {
    try {
        //let competitions = await Competition.find({ type_comp: 'CATEGORIA' }).sort({ 'race': -1, }).exec();
        //sentencia que busca cuantos animales hay para cada competencia
        let competitions = await Competition
                            .aggregate([
                                { $lookup: 
                                    { from: 'animals', 
                                      let: { category_animal: "$category", 
                                             type_animal: "$type", 
                                             race_animal: "$race",
                                             sex_animal:"$sex",
                                             group_animal:"$group"   }, 
                                      pipeline: [{ $match: 
                                      { $expr: 
                                      { $and: [{ $eq: ["$category", "$$category_animal"], }, 
                                      { $eq: ["$type_animal", "$$type_animal"] }, 
                                      { $eq: ["$race", "$$race_animal"] },
                                      { $eq: ["$sex", "$$sex_animal"] },
                                      { $eq: ["$group", "$$group_animal"] }
                                        ] } } }], 
                                      as: "animals_comp" } }]).sort({race:1, sex:1}).exec()

        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listGroup = async (req, res) => {
    try {

        let competitions = await Competition.find({ type_comp: 'GRUPO' }).sort({ 'race': 1, 'sex':1 }).exec();
       /* let competitions = await Competition.aggregate([
            {$match: {type_comp:'GRUPO'}},
            { $lookup: 
                { from: 'resultsC', 
                  $unwind:'$firts_animal',
                  let: { 
                         type_animal: "$type", 
                         race_animal: "$race",
                         sex_animal:"$sex",
                         group_animal:"$grupo"   }, 
                         
                  pipeline: [{ $match: 
                  { $expr: 
                  { $and: [ 
                  { $eq: ["$type_animal", "$$type_animal"] }, 
                  { $eq: ["$race", "$$race_animal"] },
                  { $eq: ["$sex", "$$sex_animal"] },
                  { $eq: ["$group_animal", "$$group_animal"] }
                    ] } } }], 
                  as: "animals_comp" } }]).sort({race:1, sex:1}).exec()*/
                  
        console.log(competitions)          
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listRace = async (req, res) => {
    try {
        let competitions = await Competition.find({ type_comp: 'RAZA' }).sort({ 'race': 1, 'sex':1 }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listSupreme = async (req, res) => {
    try {
        let competitions = await Competition.find({ type_comp: 'SUPREMO' }).sort({ 'type_animal': -1, }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

/*const listByComp = async (req, res) => {
    try {
        let competitions = await Competition.find({ 'type_comp': req.body.tipo_comp }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}*/
const saveCategoryC = async (req, res) => {
    console.log(req.body)
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const category = req.body.category
        const group = req.body.group
        const sex = req.body.sex
        const race = req.body.race
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        const second_animal = (!req.body.second_animal) ? '' : req.body.second_animal
        const pts_second = (!req.body.second_animal) ? 0 : req.body.pts_second
        const third_animal = (!req.body.third_animal) ? '' : req.body.third_animal
        const pts_third = (!req.body.third_animal) ? 0 : req.body.pts_third 
        const status_result = req.body.status_result
        let saveCategory = new ResultsC({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            category: category,
            group: group,
            sex: sex,
            race: race,
            type_animal: type_animal,
            firts_animal: firts_animal,
            firts_point: pts_first,
            second_animal: second_animal,
            second_point: pts_second,
            third_animal: third_animal,
            third_point: pts_third,
            status_result: status_result
        })
        await Competition.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
        //guardar los puntos
        if (type_animal === "OVINO") {
            await PuntosExpoOvi.updateOne({ team: firts_animal.team }, { $inc: { primero_category: pts_first } }).exec();
            await PuntosCriaOvi.updateOne({ participant: firts_animal.breeder }, { $inc: { primero_category: pts_first } }).exec();
            await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { primero_category: 1 } }).exec();
            await PuntosAsocOvi.updateOne({ name: firts_animal.asociation }, { $inc: { primero_category: 1 } }).exec();

            if(second_animal.length > 0){
                await PuntosExpoOvi.updateOne({ team: second_animal.team }, { $inc: { segundo_category: pts_second } }).exec();
                await PuntosCriaOvi.updateOne({ participant: second_animal.breeder }, { $inc: { segundo_category: pts_second } }).exec();
                await PuntosAsoc.updateOne({ name: second_animal.asociation }, { $inc: { segundo_category: 1 } }).exec();
                await PuntosAsocOvi.updateOne({ name: second_animal.asociation }, { $inc: { segundo_category: 1 } }).exec();
            }

            if(third_animal.length > 0){
                await PuntosExpoOvi.updateOne({ team: third_animal.team }, { $inc: { tercero_category: pts_third } }).exec();
                await PuntosCriaOvi.updateOne({ participant: third_animal.breeder }, { $inc: { tercero_category: pts_third } }).exec();
                await PuntosAsoc.updateOne({ name: third_animal.asociation }, { $inc: { tercero_category: 1 } }).exec();    
                await PuntosAsocOvi.updateOne({ name: third_animal.asociation }, { $inc: { tercero_category: 1 } }).exec();
            }
            
        } else if(type_animal === "CAPRINO") {
            
            await PuntosExpoCapri.updateOne({ team: firts_animal.team }, { $inc: { primero_category: pts_first } }).exec();
            await PuntosCriaCapri.updateOne({ participant: firts_animal.breeder }, { $inc: { primero_category: pts_first } }).exec();
            await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { primero_category: 1 } }).exec();
            await PuntosAsocCapri.updateOne({ name: firts_animal.asociation }, { $inc: { primero_category: 1 } }).exec();

            if(second_animal.length > 0 ){
                await PuntosCriaCapri.updateOne({ participant: second_animal.breeder }, { $inc: { segundo_category: pts_second } }).exec();
                await PuntosExpoCapri.updateOne({ team: second_animal.team }, { $inc: { segundo_category: pts_second } }).exec();
                await PuntosAsoc.updateOne({ name: second_animal.asociation }, { $inc: { segundo_category: 1 } }).exec();
                await PuntosAsocCapri.updateOne({ name: second_animal.asociation }, { $inc: { segundo_category: 1 } }).exec();
            }
            
            if(third_animal.length > 0){
                await PuntosCriaCapri.updateOne({ participant: third_animal.breeder }, { $inc: { tercero_category: pts_third } }).exec();
                await PuntosExpoCapri.updateOne({ team: third_animal.team }, { $inc: { tercero_category: pts_third } }).exec();
                await PuntosAsoc.updateOne({ name: third_animal.asociation }, { $inc: { tercero_category: 1 } }).exec();
                await PuntosAsocCapri.updateOne({ name: third_animal.asociation }, { $inc: { tercero_category: 1 } }).exec();
            }
                
        }
        //guadar el resultado
        saveCategory.save(function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {

                return res.json({ status: 200, message: "Resultados registrados" });
            }
        });

    } catch (error) {
        return res.status(400).send({
            message: "Ups...ocurrió un error!"
        });
    }

    
}

const categoryWinners = async (req, res) => {
    try {
        let winners = await ResultsC.find({}).exec()
        console.log(winners)
        return res.json(winners);
    } catch (error) {
        console.log(error)
    }
}

const saveGroupC = async (req, res) => {
    console.log(req.body)
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const group = req.body.group
        const sex = req.body.sex
        const race = req.body.race
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        let saveGroup = new ResultsG({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            group: group,
            sex: sex,
            race: race,
            type_animal: type_animal,
            firts_animal: firts_animal,
            firts_point: pts_first,

        })
        await Competition.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
        //guardar los puntos
        if (type_animal == "OVINO") {

            if (group == 'MENOR') {
                await PuntosExpoOvi.updateOne({ team: firts_animal.team }, { $inc: { menor: pts_first } }).exec();
                await PuntosCriaOvi.updateOne({ participant: firts_animal.breeder }, { $inc: { menor: pts_first } }).exec();
                await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { menor: 1 } }).exec();
                await PuntosAsocOvi.updateOne({ name: firts_animal.asociation }, { $inc: { menor: 1 } }).exec();
            } else if (group == 'JOVEN') {
                await PuntosExpoOvi.updateOne({ team: firts_animal.team }, { $inc: { joven: pts_first } }).exec();
                await PuntosCriaOvi.updateOne({ participant: firts_animal.breeder }, { $inc: { joven: pts_first } }).exec();
                await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { joven: 1 } }).exec();
                await PuntosAsocOvi.updateOne({ name: firts_animal.asociation }, { $inc: { joven: 1 } }).exec();
            } else {
                await PuntosExpoOvi.updateOne({ team: firts_animal.team }, { $inc: { adulto: pts_first } }).exec();
                await PuntosCriaOvi.updateOne({ participant: firts_animal.breeder }, { $inc: { adulto: pts_first } }).exec();
                await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { adulto: 1 } }).exec();
                await PuntosAsocOvi.updateOne({ name: firts_animal.asociation }, { $inc: { adulto: 1 } }).exec();

            }

        } else {
            if (group == 'MENOR') {
                await PuntosExpoCapri.updateOne({ team: firts_animal.team }, { $inc: { menor: pts_first } }).exec()
                await PuntosCriaCapri.updateOne({ participant: firts_animal.breeder }, { $inc: { menor: pts_first } }).exec()
                await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { menor: 1 } }).exec();
                await PuntosAsocCapri.updateOne({ name: firts_animal.asociation }, { $inc: { menor: 1 } }).exec();
            } else if (group == 'JOVEN') {
                await PuntosExpoCapri.updateOne({ team: firts_animal.team }, { $inc: { joven: pts_first } }).exec()
                await PuntosCriaCapri.updateOne({ participant: firts_animal.breeder }, { $inc: { joven: pts_first } }).exec()
                await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { joven: 1 } }).exec();
                await PuntosAsocCapri.updateOne({ name: firts_animal.asociation }, { $inc: { joven: 1 } }).exec();
            } else {
                await PuntosExpoCapri.updateOne({ team: firts_animal.team }, { $inc: { adulto: pts_first } }).exec()
                await PuntosCriaCapri.updateOne({ participant: firts_animal.breeder }, { $inc: { adulto: pts_first } }).exec()
                await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { adulto: 1 } }).exec();
                await PuntosAsocCapri.updateOne({ name: firts_animal.asociation }, { $inc: { adulto: 1 } }).exec();
            }

        }
        saveGroup.save(function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                return res.json({ status: 200, message: "Resultados registrados" });
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Ups...ocurrió un error!"
        });
    }




}

const groupWinners = async (req, res) => {
    try {
        let winners = await ResultsG.find({}).exec()
        console.log(winners)
        return res.json(winners);
    } catch (error) {
        console.log(error)
    }
}
const saveGroupR = async (req, res) => {
    console.log(req.body)
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const race = req.body.race
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        const second_animal = req.body.second_animal
        const pts_second = req.body.pts_second
        let saveRace = new ResultsR({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            race: race,
            type_animal: type_animal,
            firts_animal: firts_animal,
            firts_point: pts_first,
            second_animal: second_animal,
            second_point: pts_second

        })
        await Competition.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
        //guardar los puntos
        if (type_animal == "OVINO") {
            await PuntosExpoOvi.updateOne({ team: firts_animal.team }, { $inc: { raza: pts_first } }).exec();
            await PuntosExpoOvi.updateOne({ team: second_animal.team }, { $inc: { reservado: pts_second } }).exec();
            await PuntosCriaOvi.updateOne({ participant: firts_animal.breeder }, { $inc: { raza: pts_first } }).exec();
            await PuntosCriaOvi.updateOne({ participant: second_animal.breeder }, { $inc: { reservado: pts_second } }).exec();
            await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { raza: 1 } }).exec();
            await PuntosAsoc.updateOne({ name: second_animal.asociation }, { $inc: { reservado: 1 } }).exec();
            await PuntosAsocOvi.updateOne({ name: firts_animal.asociation }, { $inc: { raza: 1 } }).exec();
            await PuntosAsocOvi.updateOne({ name: second_animal.asociation }, { $inc: { reservado: 1 } }).exec();
        } else {
            await PuntosExpoCapri.updateOne({ team: firts_animal.team }, { $inc: { raza: pts_first } }).exec();
            await PuntosExpoCapri.updateOne({ team: second_animal.team }, { $inc: { reservado: pts_second } }).exec();
            await PuntosCriaCapri.updateOne({ participant: firts_animal.breeder }, { $inc: { raza: pts_first } }).exec();
            await PuntosCriaCapri.updateOne({ participant: second_animal.breeder }, { $inc: { reservado: pts_second } }).exec();
            await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { raza: 1 } }).exec();
            await PuntosAsoc.updateOne({ name: second_animal.asociation }, { $inc: { reservado: 1 } }).exec();
            await PuntosAsocCapri.updateOne({ name: firts_animal.asociation }, { $inc: { raza: 1 } }).exec();
            await PuntosAsocCapri.updateOne({ name: second_animal.asociation }, { $inc: { reservado: 1 } }).exec();
        }
        saveRace.save(function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                return res.json({ status: 200, message: "Resultados registrados" });
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Ups...ocurrió un error!"
        });
    }


}

const raceWinners = async (req, res) => {
    try {
        let winners = await ResultsR.find({}).exec()
        console.log(winners)
        return res.json(winners);
    } catch (error) {
        console.log(error)
    }
}

const saveGroupS = async (req, res) => {
    console.log(req.body)
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        let saveSupreme = new ResultsS({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            type_animal: type_animal,
            firts_animal: firts_animal,
            firts_point: pts_first,
        })

        await Competition.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
        saveSupreme.save(function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                return res.json({ status: 200, message: "Resultados registrados" });
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Ups...ocurrió un error!"
        });
    }


}

module.exports = { listCategoria, listGroup, listRace, listSupreme, saveCategoryC, categoryWinners, saveGroupC, groupWinners, saveGroupR, raceWinners, saveGroupS }