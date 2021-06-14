const moongose = require('mongoose')
const TeamModel = require('../models/equipos').default
const Team = moongose.model('Teams')
const AnimalModel = require('../models/animales')
const Animal = moongose.model('Animals')

const list = async (req, res) => {
    try {
        let teams = await Team.aggregate([{
            $lookup: {
                from: "animals",
                localField: "name",
                foreignField: "team",
                as: "all_teams"
            }
        }]).exec();
        return res.json(teams);
    } catch (error) {
        console.log(error)
    }


}
const register = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const asociation = req.body.asociation;
    const animal_type = req.body.animal_type;
    const participant = req.body.participant.toUpperCase();

    let newTeam = new Team({
        name: name,
        animal_type: animal_type,
        asociacion: asociation,
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

}
const getTeam = async (req, res) => {
    const name = req.params.id
    console.log(name)
    try {
        let team = await Team.find({ 'participant': name }).exec();
        return res.json(team);
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
try {
    let team = await Team.updateOne({ '_id': id },{ $set :{'name': name,  updated_at: new Date() } }).exec();
    return res.json({ team, message: "Información de Equipo actualizada" });    
} catch (error) {
    console.log(error)
}
}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let animals = Animal.deleteMany({'ID_team': id}).exec()
        let team = await Team.deleteOne({ '_id': id }).exec();
        return res.json({ team, message: "Equipo eliminado" });    
    } catch (error) {
        console.log(error)
    }
}
module.exports = { list, register, getTeam, update, deleted }