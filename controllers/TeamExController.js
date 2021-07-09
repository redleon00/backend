const moongose = require('mongoose')
const TeamModel = require('../models/equipos_ex')
const TeamsEx = moongose.model('TeamsEx')
const AnimalModel = require('../models/animales_ex')
const AnimalEx = moongose.model('AnimalsEx')
const ParticipantModel = require('../models/participantes')
const Participant = moongose.model('Participants')

const list = async (req, res) => {
    try {
        /*let teams = await TeamsEx.aggregate([{
            $lookup: {
                from: "animals_ex",
                localField: "name",
                foreignField: "team",
                as: "all_teams"
            }
        }]).exec();*/
        let teams = await TeamsEx.aggregate([
            {"$addFields":{"teamId":{"$toString": "$_id"}} }, 
            {"$lookup":
            {
                "from":"animals_ex", 
                "localField":"teamId", 
                "foreignField":"ID_team", 
                "as":"all_teams"
            }
        }
    ]).exec()
        return res.json(teams);
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    //console.log(req.body)
    try {
        const name = req.body.name.toUpperCase();
        const type = req.body.animal_type;
        const participant = (typeof req.body.participant == "object") ? req.body.participant.name : req.body.participant;

        let existeP = await Participant.countDocuments({name:participant}).exec()
        console.log("existeP", existeP)
        if(existeP == 0){
            let newParticipant = new Participant({
                name : participant, 
                state : 'LARA', 
                owner : true, 
                breeder: true
            })
            newParticipant.save()
        }
        //verifica que exista o no en la tabla de puntuacion por equipos
        /*if(animal_type == 'OVINO'){   
            let existe = await PuntosExpoOvi.countDocuments({team: name}).exec()
            if(existe == 0){
                let xx = new PuntosExpoOvi({
                    participant:participant,
                    team:name
                })
                xx.save();
            }
        }else{
            let existe = await PuntosExpoCapri.countDocuments({team: name}).exec()
            if(existe == 0){
                let xx = new PuntosExpoCapri({
                    participant:participant,
                    team:name
                })
                xx.save();
            }
        }*/
    // CREAR EL EQUIPO se elimino el animal_type
        let newTeam = new TeamsEx({
            name: name,
            type: type,
            participant: participant
        })
        newTeam.save(function (err, team) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {

                return res.json({ status: 200, message: "Equipo registrado, puede cargar los ejemplares", t: team });
            }
        });    
    } catch (error) {
        
    }
}

const getTeam = async (req, res) => {
    const name = req.params.id
    //console.log(name)
    try {
        let team = await TeamEx.find({ 'participant': name }).exec();
        return res.json(team);
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
try {
    let dataTeam = await TeamEx.findOne({'_id': id}).exec();
    /*if(dataTeam.animal_type == 'OVINO'){
        await PuntosExpoOvi.updateOne({'_id': dataTeam._id},{'team': name})
    }else{
        await PuntosExpoCapri.updateOne({'_id': dataTeam._id},{'team': name})
    }*/
    let team = await Team.updateOne({ '_id': id },{ $set :{'name': name,  updated_at: new Date() } }).exec();
    return res.json({ team, message: "Información de Equipo actualizada" });    
} catch (error) {
    console.log(error)
}
}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let all_animals_teams = await AnimalEx.find({'ID_team': id}).exec()
        if(all_animals_teams.length > 0 ){
            all_animals_teams.map((x) =>{
                AnimalAll.deleteOne({'_id':x.animalAll_id}).exec()
            })
        }
        let animals = AnimalEx.deleteMany({'ID_team': id}).exec()
        let team = await TeamsEx.deleteOne({ '_id': id }).exec();
        return res.json({ team, message: "Equipo eliminado" });    
    } catch (error) {
        console.log(error)
    }
}

module.exports = {list, register, getTeam, update, deleted}