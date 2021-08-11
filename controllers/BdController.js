const mongoose = require('mongoose')
const AnimalModel = require('../models/animales')
const Animal = mongoose.model('Animals')
const TeamModel = require('../models/equipos')
const Team = mongoose.model('Teams')
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
const PuntosCriaCapri = mongoose.model('PtsCriaOvi')

const ParticipantModel = require('../models/participantes')
const BreederModel = require('../models/criadores')
const ExpositorModel = require('../models/expositores')
const Participant = mongoose.model('Participants')
const Breeder = mongoose.model('Breeders')
const Expositor = mongoose.model('Expositors')
const PuntosAsocOviModel = require('../models/puntos_asoc_ovi')
const PuntosAsocOvi = mongoose.model('PtsAsocOvi')
const PuntosAsocCapriModel = require('../models/puntos_asoc_capri')
const PuntosAsocCapri = mongoose.model('PtsAsocCapri')
const PuntosAsocModel = require('../models/puntos_asoc')
const PuntosAsoc = mongoose.model('PtsAsoc')

const AnimalExModel = require('../models/animales_ex')
const AnimalEx = mongoose.model('AnimalsEx')
const TeamExModel = require('../models/equipos_ex')
const TeamEx = mongoose.model('TeamsEx')
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
const ResultsUbreModel = require('../models/resultsUbre')
const ResultsUbre = mongoose.model('ResultsUbre')
const ResultsOrdenoModel = require('../models/resultsOrdeno')
const ResultsOrdeno = mongoose.model('ResultsOrdeno')


const AnimalAllModel = require('../models/animales_all')
const AnimalAll = mongoose.model('AnimalsAll')

const reset = async(req, res) => {
    console.log(req.body)
    const animals = req.body.animals
    const results = req.body.results
    const participants = req.body.participants
    const team = req.body.team
    try {
        if(animals == true){
            Animal.remove({}).exec()
            AnimalEx.remove({}).exec()
            AnimalAll.remove({}).exec()
            Competition.updateMany({'status':false}, {$set:{'status': true}}).exec()  
            CompetitionEx.updateMany({'status':false}, {$set:{'status': true}}).exec()  
            ResultsC.remove({}).exec()
            ResultsC.remove({}).exec()
            ResultsG.remove({}).exec()
            ResultsR.remove({}).exec()
            ResultsS.remove({}).exec()
            ResultsREX.remove({}).exec()
            ResultsCeba.remove({}).exec()
            ResultsMestCat.remove({}).exec()
            ResultsMestGroup.remove({}).exec()
            ResultsMestRace.remove({}).exec()
            ResultsUbre.remove({}).exec()
            ResultsOrdeno.remove({}).exec()
            await PuntosExpoOvi.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, updated_at: new Date()}}).exec()
            await PuntosExpoCapri.updateMany({'status':true},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0,'ubre':0, 'ordeno':0, updated_at: new Date()}}).exec()
            await PuntosCriaOvi.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, updated_at: new Date()}}).exec()
            await PuntosCriaCapri.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, 'ubre':0, 'ordeno':0, updated_at: new Date()}}).exec()
            await PuntosAsocOvi.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, updated_at: new Date()}}).exec()
            await PuntosAsocCapri.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0,'ubre':0, 'ordeno':0, updated_at: new Date()}}).exec()
            await PuntosAsoc.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0,'ubre':0, 'ordeno':0, updated_at: new Date()}}).exec()


        }else if(results == true){
            Competition.updateMany({'status':false}, {$set:{'status': true}}).exec() 
            CompetitionEx.updateMany({'status':false}, {$set:{'status': true}}).exec()  
            ResultsC.remove({}).exec()
            ResultsG.remove({}).exec()
            ResultsR.remove({}).exec()
            ResultsS.remove({}).exec()
            ResultsREX.remove({}).exec()
            ResultsCeba.remove({}).exec()
            ResultsMestCat.remove({}).exec()
            ResultsMestGroup.remove({}).exec()
            ResultsMestRace.remove({}).exec()
            ResultsUbre.remove({}).exec()
            await AnimalEx.updateMany({'milker':true},{$set:{'status':true}}).exec()
            await PuntosExpoOvi.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, updated_at: new Date()}}).exec()
            await PuntosExpoCapri.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, 'ubre':0, 'ordeno':0,updated_at: new Date()}}).exec()
            await PuntosCriaOvi.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, updated_at: new Date()}}).exec()
            await PuntosCriaCapri.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, 'ubre':0, 'ordeno':0, updated_at: new Date()}}).exec()
            await PuntosAsocOvi.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, updated_at: new Date()}}).exec()
            await PuntosAsocCapri.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0, 'ubre':0, 'ordeno':0, updated_at: new Date()}}).exec()
            await PuntosAsoc.updateMany({},{$set:{'primero_category':0, 'segundo_category':0, 'tercero_category':0, 'menor':0, 'joven':0, 'adulto':0, 'raza':0, 'reservado':0,'ubre':0, 'ordeno':0, updated_at: new Date()}}).exec()
            
        }   
        if(participants == true){
            Participant.remove({}).exec();
            Breeder.remove({}).exec();
            Expositor.remove({}).exec();
            Team.remove({}).exec()
            TeamEx.remove({}).exec()
            Animal.remove({}).exec();
            AnimalEx.remove({}).exec()
            PuntosExpoOvi.remove({}).exec()
            PuntosExpoCapri.remove({}).exec()
            PuntosCriaOvi.remove({}).exec()
            PuntosCriaCapri.remove({}).exec()
            PuntosAsocOvi.remove({}).exec()
            PuntosAsocCapri.remove({}).exec()
            PuntosAsoc.remove({}).exec()
        } 
        if(team == true){
            Participant.remove({}).exec();
            Breeder.remove({}).exec();
            Expositor.remove({}).exec();
            Animal.remove({}).exec()
            AnimalEx.remove({}).exec()
            Team.remove({}).exec()
            TeamEx.remove({}).exec()
            PuntosExpoOvi.remove({}).exec()
            PuntosExpoCapri.remove({}).exec()
            PuntosCriaOvi.remove({}).exec()
            PuntosCriaCapri.remove({}).exec()
            PuntosAsocOvi.remove({}).exec()
            PuntosAsocCapri.remove({}).exec()
            PuntosAsoc.remove({}).exec()
        }
        return res.json({message: "Valores reiniciados"})
    } catch (error) {
        return res.json({status:500, message: "Ups, ocurrio un error"})
    }
    
}



module.exports = { reset }