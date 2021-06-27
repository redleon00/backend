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


const reset = async(req, res) => {
    console.log(req.body)
    const animals = req.body.animals
    const results = req.body.results
    const participants = req.body.participants
    const team = req.body.team
    try {
        if(animals == true){
            Animal.remove({}).exec()
            Competition.updateMany({'status':false}, {$set:{'status': true}}).exec()  
            ResultsC.remove({}).exec()
            ResultsG.remove({}).exec()
            ResultsR.remove({}).exec()
            ResultsS.remove({}).exec()
            PuntosExpoOvi.remove({}).exec()
            PuntosExpoCapri.remove({}).exec()
            PuntosCriaOvi.remove({}).exec()
            PuntosCriaCapri.remove({}).exec()
            PuntosAsocOvi.remove({}).exec()
            PuntosAsocCapri.remove({}).exec()
            PuntosAsoc.remove({}).exec()


        }else if(results == true){
            Competition.updateMany({'status':false}, {$set:{'status': true}}).exec() 
            ResultsC.remove({}).exec()
            ResultsG.remove({}).exec()
            ResultsR.remove({}).exec()
            ResultsS.remove({}).exec()
            PuntosExpoOvi.remove({}).exec()
            PuntosExpoCapri.remove({}).exec()
            PuntosCriaOvi.remove({}).exec()
            PuntosCriaCapri.remove({}).exec()
            PuntosAsocOvi.remove({}).exec()
            PuntosAsocCapri.remove({}).exec()
            PuntosAsoc.remove({}).exec()
            
        }   
        if(participants == true){
            Participant.remove({}).exec();
            Breeder.remove({}).exec();
            Expositor.remove({}).exec();
            Animal.remove({}).exec()
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
            Team.remove({}).exec()
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