const mongoose = require('mongoose')
const AnimalExModel = require('../models/animales_ex')
const AnimalEx = mongoose.model('AnimalsEx')
const TeamExModel = require('../models/equipos_ex')
const TeamEx = mongoose.model('TeamsEx')
const ParticipantModel = require('../models/participantes')
const Participant = mongoose.model('Participants')
const AnimalAllModel = require('../models/animales_all')
const AnimalAll = mongoose.model('AnimalsAll')
const ResultsOrdenoModel = require('../models/resultsOrdeno')
const ResultsOrdeno = mongoose.model('ResultsOrdeno')
/*const PuntosCriaOviModel = require('../models/puntos_criador_ovino')
const PuntosCriaOvi = mongoose.model('PtsCriaOvi')
const PuntosCriaCapriModel = require('../models/puntos_criador_caprino')
const PuntosCriaCapri = mongoose.model('PtsCriaOvi')*/


//Animal for competition register
const register = async (req, res) => {
    console.log(req.body)
    try {
    var animalAll_id = ''
    const name = req.body.name.toUpperCase();
    const sex = req.body.sex;
    const birthday = req.body.birthday;
    const type = req.body.type; //Ovino o Caprino
    const race = req.body.race.name;
    const category = req.body.categoria;
    const owner = req.body.owner;
    const breeder = (typeof req.body.breeder == "object") ? req.body.breeder.name.toUpperCase() : req.body.breeder.toUpperCase();
    const team = req.body.team;
    const ID_team = req.body.ID_team;
    const register = req.body.register.toUpperCase();
    const tatoo = req.body.tatoo.toUpperCase();
    const asociation = req.body.asociation
    const group = req.body.group
    let existeB = await Participant.countDocuments({name:breeder}).exec()
    
    if(existeB == 0){
        let newParticipant = new Participant({
            name : breeder, 
            state : 'LARA', 
            owner : true, 
            breeder: true
        })
        newParticipant.save()
    }
    /*if(type == 'OVINO'){
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
    let existeAll = await AnimalAll.countDocuments({'name':name, 'owner':owner}).exec()
    if(existeAll == 0){
        let newAll = new AnimalAll({
            name: name,
            sex: sex,
            birthday: birthday,
            type: type,
            race: race,
            owner: owner,
            breeder: breeder,
            register: register,
            tatoo: tatoo,
            asociation: asociation
        })
        let test = await newAll.save() //Se guarda el animal en la collection de todos los animales
        let animalAll = await AnimalAll.find({}).sort({_id:-1}).limit(1).exec();
        animalAll_id = animalAll[0]._id
    }else{
        let animalAll = await AnimalAll.find({'name':name, 'owner':owner}).exec();
        animalAll_id = animalAll[0]._id
    }
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
        group: group,
        animalAll_id:animalAll_id
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
        console.log(animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let existe = await AnimalEx.countDocuments({ '_id': id }).exec();
        if(existe > 0){
            let animal = await AnimalEx.findOne({ '_id': id }).exec();
                         await AnimalEx.deleteOne({ '_id': id }).exec();
                         await AnimalAll.deleteOne({ '_id': animal.animalAll_id }).exec();
            return res.json({ animal, message: "Animal eliminado" });
        }
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
    const group = req.body.group

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
       /* if(animalX.type == 'OVINO'){
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
                    'updated_at': new Date()
                }
            }).exec();
        //Actualizacion en collection de animalAll
        let updated = await AnimalEx.findOne({'_id':req.params.id}).exec();
        await AnimalAll.updateOne(
            { '_id': updated.animalAll_id },
            {
                $set:
                {
                    'name': name,
                    'sex': sex,
                    'birthday': birthday,
                    'race': race,
                    'breeder': breeder,
                    'register': register,
                    'tatoo': tatoo,
                    'asociation': asociation,
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
            const group = req.body.group
            let animal = await AnimalEx.updateOne({ '_id': req.params.id }, { $set: {'name':name, 'sex':sex, 'race':race, 'category':category, 'owner':owner, 'breeder':breeder, 'register':register, 'tatoo':tatoo, 'team':team, 'birthday':birthday, 'asociation': asociation, 'group': group} }).exec();
            return res.json({ animal, message: "Animal actualizado" });
    
        }    
    } catch (error) {
        console.log(error)
        return res.json({ message: "Ups..ocurrió un error!"});
    }
    


}

const listCeba = async (req, res) => {
    try {
        let animals = await AnimalEx.find({$or:[{race:'CORDEROS DE CEBA'},{race:'CEBA'}]}).exec();
        //console.log(animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}

const listMilker = async (req, res) => {
    try {
        let animals = await AnimalEx.find({$or:[{best_tits: true},{milker:true}]}).exec();
        //console.log(animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}

const listUbre = async (req, res) => {
    try {
        let animals = await AnimalEx.find({best_tits: true}).exec();
        //console.log(animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}

const listOrdeno = async (req, res) => {
    try {
        //let animals = await AnimalEx.find({milker: true}).exec();
        //console.log(animals)
        let animals = await AnimalEx.aggregate([
            { "$match": { "milker": true } },
            {"$addFields":{"animalId":{"$toString": "$_id"}} }, 
            {"$lookup":
            {
                "from":"resultsOrdeno", 
                "localField":"animalId", 
                "foreignField":"id_animal", 
                "as":"results_pts"
            }
        }
    ]).exec()
        //console.log("animales milker", animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }
}

module.exports = { register, list, deleted, update, updateOne, listCeba, listMilker, listUbre, listOrdeno }