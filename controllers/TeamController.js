const moongose = require('mongoose')
const TeamModel = require('../models/equipos').default
const Team = moongose.model('Teams')
const AnimalModel = require('../models/animales')
const Animal = moongose.model('Animals')
const ParticipantModel = require('../models/participantes')
const Participant = moongose.model('Participants')
const PuntosExpoOviModel = require('../models/puntos_expo_ovino')
const PuntosExpoOvi = moongose.model('PtsExpoOvi')
const PuntosExpoCapriModel = require('../models/puntos_expo_caprino')
const PuntosExpoCapri = moongose.model('PtsExpoCapri')
const AnimalAllModel = require('../models/animales_all')
const AnimalAll = moongose.model('AnimalsAll')

const list = async (req, res) => {
    try {
        /*let teams = await Team.aggregate([{
            $lookup: {
                from: "animals",
                localField: "name",
                foreignField: "team",
                as: "all_teams"
            }
        }]).exec();*/
        let teams = await Team.aggregate([
                {"$addFields":{"teamId":{"$toString": "$_id"}} }, 
                {"$lookup":
                {
                    "from":"animals", 
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
        const animal_type = req.body.animal_type;
        const participant = (typeof req.body.participant == "object") ? req.body.participant.name : req.body.participant;
        let existeP = await Participant.countDocuments({ name: participant }).exec()
        console.log("existeP", existeP)
        if (existeP == 0) {
            let newParticipant = new Participant({
                name: participant,
                state: 'LARA',
                owner: true,
                breeder: true
            })
            newParticipant.save()
        }
        //verifica que exista o no en la tabla de puntuacion por equipos
        if (animal_type == 'OVINO') {
            let existe = await PuntosExpoOvi.countDocuments({ team: name }).exec()
            console.log("entro", existe)
            if (existe == 0) {
                let xx = new PuntosExpoOvi({
                    participant: participant
                   
                })
                xx.save();
            }
        } else {
            let existe = await PuntosExpoCapri.countDocuments({ team: name }).exec()
            if (existe == 0) {
                let xx = new PuntosExpoCapri({
                    participant: participant
                   
                })
                xx.save();
            }
        }
        // CREAR EL EQUIPO
        let newTeam = new Team({
            name: name,
            animal_type: animal_type,
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
        });ID_team
    } catch (error) {

    }




}
const getTeam = async (req, res) => {
    const name = req.params.id
    //console.log(name)
    try {
        let team = await Team.find({ 'participant': name }).exec();
        return res.json(team);
    } catch (error) {
        console.log(error)
    }
}

const update = async (req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
    try {
        let dataTeam = await Team.findOne({ '_id': id }).exec();
        if (dataTeam.animal_type == 'OVINO') {
            await PuntosExpoOvi.updateOne({ '_id': dataTeam._id }, { 'team': name })
        } else {
            await PuntosExpoCapri.updateOne({ '_id': dataTeam._id }, { 'team': name })
        }
        let team = await Team.updateOne({ '_id': id }, { $set: { 'name': name, updated_at: new Date() } }).exec();
        return res.json({ team, message: "Información de Equipo actualizada" });
    } catch (error) {
        console.log(error)
    }
}

const deleted = async (req, res) => {
    const id = req.params.id
    let dataTeam = await Team.findOne({ '_id': id }).exec();
    try {
        if (dataTeam.animal_type == 'OVINO') {
            await PuntosExpoOvi.deleteOne({ '_id': dataTeam._id }, { 'team': dataTeam.name })
        } else {
            await PuntosExpoCapri.deleteOne({ '_id': dataTeam._id }, { 'team': dataTeam.name })
        }
        let all_animals_teams = await Animal.find({'ID_team': id}).exec()
        if(all_animals_teams.length > 0 ){
            all_animals_teams.map((x) =>{
                AnimalAll.deleteOne({'_id':x.animalAll_id}).exec()
            })
        }
        let animals = Animal.deleteMany({ 'ID_team': id }).exec()
        let team = await Team.deleteOne({ '_id': id }).exec();
        return res.json({ team, message: "Equipo eliminado" });
    } catch (error) {
        console.log(error)
    }
}

const numOfTeams = async (req, res) => {
    const participant = req.body.participant
    const animal_type = req.body.animal_type
    let maxTeam = await Team.countDocuments({ participant: participant, animal_type: animal_type }).exec();
    return res.json({ maxTeam: maxTeam, message: "Cantidad de equipos" });
}
module.exports = { list, register, getTeam, update, deleted, numOfTeams }