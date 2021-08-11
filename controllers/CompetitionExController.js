const mongoose = require('mongoose')
const CompetitionExModel = require('../models/competenciasEx')
const CompetitionEx = mongoose.model('CompetitionsEx')
const ResultsREXModel = require('../models/resultRaceEx')
const ResultsREX = mongoose.model('ResultsREX')
const ResultsCebaModel = require('../models/resultsCeba')
const ResultsCeba = mongoose.model('ResultsCeba')
const ResultsMestCatModel = require('../models/resultsMestCategory')
const ResultsMestCat = mongoose.model('ResultsMC')
const ResultsMestGroupModel = require('../models/resultsMestGroup')
const ResultsMestGroup = mongoose.model('ResultsMG')
const ResultsMestRaceModel = require('../models/resultsMestRace')
const ResultsMestRace = mongoose.model('ResultsMR')
const AnimalExModel = require('../models/animales_ex')
const AnimalEx = mongoose.model('AnimalsEx')

const ResultsOrdenoModel = require('../models/resultsOrdeno')
const ResultsOrdeno = mongoose.model('ResultsOrdeno')
const ResultsUbreModel = require('../models/resultsUbre')
const ResultsUbre = mongoose.model('ResultsUbre')
const PuntosExpoCapriModel = require('../models/puntos_expo_caprino')
const PuntosExpoCapri = mongoose.model('PtsExpoCapri')
const PuntosCriaCapriModel = require('../models/puntos_criador_caprino')
const PuntosCriaCapri = mongoose.model('PtsCriaCapri')
const PuntosAsocCapriModel = require('../models/puntos_asoc_capri')
const PuntosAsocCapri = mongoose.model('PtsAsocCapri')
const PuntosAsocModel = require('../models/puntos_asoc')
const PuntosAsoc = mongoose.model('PtsAsoc')

const listCompRace = async (req, res) => {
    try {
        let competitions = await CompetitionEx.find({ type_comp: 'CATEGORIA' }).sort({ 'race': -1, }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listCompCeba = async (req, res) => {
    try {
        let competitions = await CompetitionEx.find({ type_comp: 'CEBA' }).sort({ 'race': -1, }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listCompMestizasCat = async (req, res) => {
    try {
        let competitions = await CompetitionEx.find({ type_comp: 'MESTIZAS' }).sort({ '_id': 1, }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listCompMestizasGroup = async (req, res) => {
    try {
        let competitions = await CompetitionEx.find({ type_comp: 'GRUPO' }).sort({ '_id': 1, }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listCompMestizasRaza = async (req, res) => {
    try {
        let competitions = await CompetitionEx.find({ type_comp: 'RAZA' }).sort({ '_id': 1, }).exec();
        console.log(competitions)
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listCompUbre = async (req, res) => {
    try {
        let competitions = await CompetitionEx.find({ type_comp: 'UBRE' }).sort({ '_id': 1, }).exec();
        //console.log(competitions)
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}

const listCompOrdeno  = async (req, res) => {
    try {
        let competitions = await CompetitionEx.find({ type_comp: 'ORDEÑO' }).sort({ '_id': 1, }).exec();
        return res.json(competitions);
    } catch (error) {
        console.log(error)
    }
}
const mestizasCatWinners = async (req, res) => {
    try {
        let winners = await ResultsMestCat.find({}).exec()
        console.log(winners)
        return res.json(winners);
    } catch (error) {
        console.log(error)
    }
    
}

const mestizasGroupWinners = async (req, res) => {
    try {
        let winners = await ResultsMestGroup.find({}).exec()
        console.log(winners)
        return res.json(winners);
    } catch (error) {
        console.log(error)
    }
    
}

const mestizasRaceWinners = async (req, res) => {
    try {
        let winners = await ResultsMestRace.find({}).exec()
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
        const third_animal = req.body.third_animal
        const pts_third = req.body.pts_third
        const category = req.body.category
        let saveRace = new ResultsREX({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            category: category,
            race: race,
            type_animal: type_animal,
            firts_animal: firts_animal,
            firts_point: pts_first,
            second_animal: second_animal,
            second_point: pts_second,
            third_animal: third_animal,
            third_point: pts_third
        })
        await CompetitionEx.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
       
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

const saveCeba = async (req, res) => {
    console.log(req.body)
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        const second_animal = req.body.second_animal
        const pts_second = req.body.pts_second
        const third_animal = req.body.third_animal
        const pts_third = req.body.pts_third
        const category = req.body.category
        let saveRace = new ResultsCeba({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            category: category,
            type_animal: type_animal,
            firts_animal: firts_animal,
            firts_point: pts_first,
            second_animal: second_animal,
            second_point: pts_second,
            third_animal: third_animal,
            third_point: pts_third,
            /*type_comp: 'CATEGORIA',
            class: 'EXHIBICION'*/

        })
        await CompetitionEx.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
       
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

const saveMestizasCat = async (req, res) => {
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        const second_animal = req.body.second_animal
        const pts_second = req.body.pts_second
        const third_animal = req.body.third_animal
        const pts_third = req.body.pts_third
        const category = req.body.category
        const group = req.body.group
        const race = req.body.race

        let saveMC = new ResultsMestCat({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            category: category,
            type_animal: type_animal,
            race: race,
            group: group,
            firts_animal: firts_animal,
            firts_point: pts_first,
            second_animal: second_animal,
            second_point: pts_second,
            third_animal: third_animal,
            third_point: pts_third,
        })
        //await 
        
        saveMC.save(function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                CompetitionEx.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
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

const saveMestizasGroup = async (req, res) =>{
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        const group = req.body.group
        const race = req.body.race
        const category = req.body.category
        let saveMG = new ResultsMestGroup({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            category: category,
            type_animal: type_animal,
            race: race,
            group: group,
            firts_animal: firts_animal,
            firts_point: pts_first,
    
        })
        //await 
        saveMG.save(function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                CompetitionEx.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec() 
                return res.json({ status: 200, message: "Resultados registrados" });
            }
        });  
        
    } catch (error) {
        console.log(error)
        return res.json({ status: 400, message: "Ups!...ocurrió un error" });

    }
}

const saveMestizasRace = async (req, res) => {
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        const race = req.body.race
        const category = req.body.category
        let saveMG = new ResultsMestRace({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            category: category,
            type_animal: type_animal,
            race: race,
            firts_animal: firts_animal,
            firts_point: pts_first,
    
        })
        //await 
        saveMG.save(function (err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                CompetitionEx.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec() 
                return res.json({ status: 200, message: "Resultados registrados" });
            }
        });  
        
    } catch (error) {
        console.log(error)
        return res.json({ status: 400, message: "Ups!...ocurrió un error" });

    }
}

const saveUbre = async (req, res) => {
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const type_animal = req.body.type_animal
        const firts_animal = req.body.firts_animal
        const pts_first = req.body.pts_first
        const second_animal = req.body.second_animal
        const pts_second = req.body.pts_second
        const third_animal = req.body.third_animal
        const pts_third = req.body.pts_third

        let saveUbre = new ResultsUbre({
            id_competencia: id_competencia,
            name_competencia: name_competencia,
            sex: sex,
            type_animal: type_animal,
            firts_animal: firts_animal,
            firts_point: pts_first,
            second_animal: second_animal,
            second_point: pts_second,
            third_animal: third_animal,
            third_point: pts_third,
        })
        await CompetitionEx.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()

        await PuntosExpoCapri.updateOne({ team: firts_animal.team }, { $inc: { ubre: pts_first } }).exec();
        await PuntosExpoCapri.updateOne({ team: second_animal.team }, { $inc: { ubre: pts_second } }).exec();
        await PuntosExpoCapri.updateOne({ team: third_animal.team }, { $inc: { ubre: pts_third } }).exec();

        await PuntosCriaCapri.updateOne({ participant: firts_animal.breeder }, { $inc: { ubre: pts_first } }).exec();
        await PuntosCriaCapri.updateOne({ participant: second_animal.breeder }, { $inc: { ubre: pts_second } }).exec();
        await PuntosCriaCapri.updateOne({ participant: third_animal.breeder }, { $inc: { ubre: pts_third } }).exec();

        await PuntosAsoc.updateOne({ name: firts_animal.asociation }, { $inc: { ubre: 1 } }).exec();
        await PuntosAsoc.updateOne({ name: second_animal.asociation }, { $inc: { ubre: 1 } }).exec();
        await PuntosAsoc.updateOne({ name: third_animal.asociation }, { $inc: { ubre: 1 } }).exec();

        await PuntosAsocCapri.updateOne({ name: firts_animal.asociation }, { $inc: { ubre: 1 } }).exec();
        await PuntosAsocCapri.updateOne({ name: second_animal.asociation }, { $inc: { ubre: 1 } }).exec();
        await PuntosAsocCapri.updateOne({ name: third_animal.asociation }, { $inc: { ubre: 1 } }).exec();

        //guadar el resultado
        saveUbre.save(function (err, data) {
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
        return res.json({ status: 400, message: "Ups!...ocurrió un error" });
    }
}

const saveOrdeno = async (req, res) =>{
    try {
        const id_competencia = req.body.id_competencia
        const name_competencia = req.body.name_competencia
        const sex = req.body.sex
        const type_animal = req.body.type_animal
        const animal = req.body.animal
        const id_animal = req.body.id_animal
        const firts_point = req.body.firts_point
        const second_point = req.body.second_point
        const third_point = req.body.third_point
        const four_point = req.body.four_point

        const pts_first = req.body.pts_first
        const pts_second = req.body.second_point
        const pts_third = req.body.third_point
        

        //await CompetitionEx.updateOne({ '_id': id_competencia }, { $set: { 'status': false } }).exec()
        let existe = await ResultsOrdeno.countDocuments({'id_animal':id_animal}).exec()
        if(existe == 0){
            let saveOrdeno = new ResultsOrdeno({
                id_competencia: id_competencia,
                name_competencia: name_competencia,
                sex: sex,
                type_animal: type_animal,
                id_animal: id_animal,
                animal: animal,
                firts_point: firts_point,
                second_point: second_point,
                third_point: third_point,
                four_point: four_point
            })
            saveOrdeno.save(function (err, data) {
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    return res.json({ status: 200, message: "Resultados registrados" });
                }
            })
        }else{
            await ResultsOrdeno.updateOne({'id_animal':id_animal},{$set:{firts_point: firts_point,second_point: second_point,third_point: third_point,four_point: four_point}}).exec()
            return res.json({ status: 200, message: "Resultados registrados" });
        }
         


        
    } catch (error) {
        console.log(error)
        return res.json({ status: 400, message: "Ups!...ocurrió un error" });
    }
}

const saveOrdenoFin = async (req, res) =>{
    //console.log("data", req.body)
    try {
        
        let points = [15, 10, 5]
        //let datos = await ResultsOrdeno.find({}).sort({})
        await CompetitionEx.updateOne({'type_comp': 'ORDEÑO' }, { $set: { 'status': false } }).exec()
        let resultsOrdeno = await ResultsOrdeno.
        aggregate([
            {$project:{
                animal:1,
                firts_point:1,
                second_point:1, 
                third_point:1,
                four_point:1, 
                "total":{
                    $sum:[
                        "$firts_point",
                        "$second_point",
                        "$third_point",
                        "$four_point"
                    ]}}},{$sort:{"total":-1}}])
        
        console.log("resultados", resultsOrdeno)  
        for (let i = 0; i < points.length; i++) {
            if(resultsOrdeno[i].total > 0){

                await PuntosExpoCapri.updateOne({ team: resultsOrdeno[i].animal.team }, { $inc: { ordeno: points[i] } }).exec();
                
                await PuntosCriaCapri.updateOne({ participant: resultsOrdeno[i].animal.breeder }, { $inc: { ordeno: points[i] } }).exec();
                
                await PuntosAsoc.updateOne({ name: resultsOrdeno[i].animal.asociation }, { $inc: { ordeno: 1 } }).exec();
            
                await PuntosAsocCapri.updateOne({ name: resultsOrdeno[i].animal.asociation }, { $inc: { ordeno: 1 } }).exec();
            }
            
            
        }          
        await AnimalEx.updateMany({'milker':true},{$set:{'status': false}}).exec()
        res.json({ status: 200, message: "Resultados registrados" });    
    } catch (error) {
        console.log(error)
        return res.json({ status: 400, message: "Ups!...ocurrió un error" });
    }
    
}

module.exports = {listCompRace, saveGroupR, listCompCeba, saveCeba, listCompMestizasCat, listCompMestizasGroup, listCompMestizasRaza, saveMestizasCat, mestizasCatWinners, saveMestizasGroup, mestizasGroupWinners, mestizasRaceWinners, saveMestizasRace, listCompUbre, saveUbre, listCompOrdeno, saveOrdeno, saveOrdenoFin}