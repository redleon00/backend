const mongoose = require('mongoose')
const AnimalExModel = require('../models/animales_ex')
const AnimalEx = mongoose.model('AnimalsEx')
const TeamExModel = require('../models/equipos_ex')
const TeamEx = mongoose.model('TeamsEx')
const ParticipantModel = require('../models/participantes')
const Participant = mongoose.model('Participants')

//Animal for competition register
const register = async (req, res) => {
    console.log(req.body)
    try {
    const name = req.body.name.toUpperCase();
    const sex = req.body.sex;
    const birthday = req.body.birthday;
    const type = req.body.animal_type; //Ovino o Caprino
    const race = req.body.race.name;
    const category = req.body.categoria;
    const owner = req.body.owner;
    const breeder = (typeof req.body.breeder == "object") ? req.body.breeder.name.toUpperCase() : req.body.breeder.toUpperCase();
    const team = req.body.team;
    const ID_team = req.body.ID_team;
    const register = req.body.register.toUpperCase();
    const tatoo = req.body.tatoo.toUpperCase();
    const asociation = req.body.asociation
    const group = ''
    //console.log(breeder)
    let existeB = await Participant.countDocuments({name:breeder}).exec()
    console.log("existeB", breeder)
    if(existeB == 0){
        let newParticipant = new Participant({
            name : breeder, 
            state : 'LARA', 
            owner : true, 
            breeder: true
        })
        newParticipant.save()
    }
   /* if(type == 'OVINO'){
        let existe = await PuntosCriaOvi.countDocuments({team: name}).exec()
        if(existe == 0){
            let xx = new PuntosCriaOvi({
                participant:breeder,
                team:team
            })
            xx.save();
        }
    }else{
        let existe = await PuntosCriaCapri.countDocuments({team: name}).exec()
        if(existe == 0){
            let xx = new PuntosCriaCapri({
                participant:breeder,
                team:team
            })
            xx.save();
        }
    }*/
    let newAnimal = new AnimalEx({
        name: name,
        sex: sex,
        birthday: birthday,
        type: type,
        race: race,
        category: category,
        owner: owner,
        breeder: breeder,
        team: team,
        ID_team: ID_team,
        register: register,
        tatoo: tatoo,
        asociation: asociation,
        group: group
    })
    newAnimal.save(function (err, animal) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {

            return res.json({ status: 200, message: "Animal registrado", animal: animal });
        }
    });    
    } catch (error) {
        console.log(error)
        return res.json({ message: "Ups..ocurrió un error!"});
    }
    

}

const list = async (req, res) => {
    try {
        let animals = await AnimalEx.find({}).exec();
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }
}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let animal = await AnimalEx.deleteOne({ '_id': id }).exec();
        return res.json({ animal, message: "Animal eliminado" });
    } catch (error) {
        console.log(error)
    }
}

const update = async (req, res) => {
    //console.log("update", req.body)
    const name = req.body.name.toUpperCase();
    const sex = req.body.sex;
    const birthday = req.body.birthday;
    const race = req.body.race;
    const category = req.body.categoria;
    const breeder = req.body.breeder;
    const register = req.body.register.toUpperCase();
    const tatoo = req.body.tatoo.toUpperCase();
    const asociation = req.body.asociation
    const group = ''
    const type = req.body.animal_type; //Ovino o Caprino

    try {
        let existeB = await Participant.countDocuments({name:breeder}).exec()
        console.log("existeB", breeder)
        if(existeB == 0){
            let newParticipant = new Participant({
                name : breeder, 
                state : 'LARA', 
                owner : true, 
                breeder: true
            })
            newParticipant.save()
        }
        let animalX = await AnimalEx.findOne({'_id': req.params.id}).exec()
        /*if(animalX.type == 'OVINO'){
            let existe = await PuntosCriaOvi.countDocuments({team: name}).exec()
            if(existe == 0){
                let xx = new PuntosCriaOvi({
                    participant:animalX.participant,
                    team:name
                })
                xx.save();
            }
        }else{
            let existe = await PuntosCriaCapri.countDocuments({team: name}).exec()
            if(existe == 0){
                let xx = new PuntosCriaCapri({
                    participant:animalX.participant,
                    team:name
                })
                xx.save();
            }
        }*/

        let animal = await AnimalEx.updateOne(
            { '_id': req.params.id },
            {
                $set:
                {
                    'name': name,
                    'sex': sex,
                    'birthday': birthday,
                    'race': race,
                    'category': category,
                    'breeder': breeder,
                    'register': register,
                    'tatoo': tatoo,
                    'asociation': asociation,
                    'group': group,
                    'type': type,
                    'updated_at': new Date()
                }
            }).exec();
        return res.json({ animal, message: "Animal actualizado" });
    } catch (error) {
        console.log(error)
    }
}
const updateOne = async (req, res) => {
    //console.log(req.body)
    const changeTeam = req.body.changeTeam
    const team = req.body.team
    //const oldteam = req.body.oldteam
    try {
        if (changeTeam) {
            let numAnimals = await TeamEx.countDocuments({ name: team.name }).exec()
            if (numAnimals < 10)
                return res.json({ message: `El equipo ${team} está completo, intente en otro equipo` })
        } else {
            const name = req.body.name.toUpperCase();
            const sex = req.body.sex;
            const race = req.body.race;
            const category = req.body.category;
            const owner = req.body.owner;
            const breeder = req.body.breeder;
            const register = req.body.register;
            const tatoo = req.body.tatoo;
            const team = req.body.team;
            const birthday = req.body.birthday
            const asociation = req.body.asociation
            const group = ''
            const type = req.body.type
            let animal = await Animal.updateOne({ '_id': req.params.id }, { $set: {'name':name, 'sex':sex, 'race':race, 'category':category, 'owner':owner, 'breeder':breeder, 'register':register, 'tatoo':tatoo, 'team':team, 'birthday':birthday, 'asociation': asociation, 'group': group, 'type': type} }).exec();
            return res.json({ animal, message: "Animal actualizado" });
    
        }    
    } catch (error) {
        console.log(error)
        return res.json({ message: "Ups..ocurrió un error!"});
    }
    


}
module.exports =  { register, list, deleted, update, updateOne }