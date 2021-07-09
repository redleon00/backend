const mongoose = require('mongoose')
const AnimalsMilkModel = require('../models/animales_milk')
const AnimalsMilk = mongoose.model('AnimalsMilk')
const AnimalAllModel = require('../models/animales_all')
const AnimalAll = mongoose.model('AnimalsAll')
const AnimalExModel = require('../models/animales_ex')
const AnimalEx = mongoose.model('AnimalsEx')
const AnimalModel = require('../models/animales')
const Animal = mongoose.model('Animals')
const TeamExModel = require('../models/equipos_ex')
const TeamEx = mongoose.model('TeamsEx')
const Participant = mongoose.model('Participants')
const PuntosCriaOviModel = require('../models/puntos_criador_ovino')

const list = async (req, res) => {
    try {
        let animalsMilk = await AnimalsMilk.find({}).exec();
        //console.log(animals)
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}

const listMilk = async (req, res) => {
    try {
        let animalsMilk = await AnimalsMilk.find({ milker: true }).exec();
        //console.log(animals)
        return res.json(animalsMilk);
    } catch (error) {
        console.log(error)
    }
}

const listTits = async (req, res) => {
    try {
        let animalsTits = await AnimalsMilk.find({ best_tits: true }).exec();
        //console.log(animals)
        return res.json(animalsTits);
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    console.log("datos", req.body)
    const name = (typeof req.body.name == "object") ? req.body.name.name.toUpperCase() : req.body.name.toUpperCase();
    const sex = 'H';
    const birthday = req.body.birthday;
    const race = (typeof req.body.race == "object") ? req.body.race.name.toUpperCase() : req.body.race.toUpperCase();
    const category = req.body.categoria;
    const breeder = (typeof req.body.breeder == "object") ? req.body.breeder.name.toUpperCase() : req.body.breeder.toUpperCase();
    const register = (req.body.reg.length > 0) ? req.body.reg.toUpperCase(): '';
    const tatoo = (req.body.tatoo.length > 0 ) ? req.body.tatoo.toUpperCase() : '';
    const asociation = req.body.asociation
    const best_tits = req.body.best_tits
    const milker = req.body.milker
    const team = (typeof req.body.team == "object") ? req.body.team.name.toUpperCase() : req.body.team.toUpperCase();
    const owner = req.body.owner
    try {
        let dataTeam = await TeamEx.find({ name: team }).exec()
        let existeB = await Participant.countDocuments({ name: breeder }).exec()
        if (existeB == 0) {
            let newParticipant = new Participant({
                name: breeder,
                state: 'LARA',
                owner: true,
                breeder: true
            })
            newParticipant.save()
        }
        let existeAll = await AnimalAll.countDocuments({ 'name': name, 'tatoo': tatoo }).exec()
        console.log("existeAll", existeAll)
        if (existeAll == 0) {
            let newAll = new AnimalAll({
                name: name,
                sex: sex,
                birthday: birthday,
                type: 'CAPRINO',
                race: race,
                //owner: owner,
                breeder: breeder,
                register: register,
                tatoo: tatoo,
                asociation: asociation
            })
            let test = await newAll.save() //Se guarda el animal en la collection de todos los animales
            let animalAll = await AnimalAll.find({}).sort({ _id: -1 }).limit(1).exec();
            console.log("animalAll", animalAll)
            animalAll_id = animalAll[0]._id
            //console.log("aqui", animalAll[0]._id)
        } else {
            let animalAll = await AnimalAll.find({ 'name': name, 'tatoo': tatoo }).exec();
            animalAll_id = animalAll[0]._id
            //console.log("aqui 2", animalAll[0]._id)
        }
        let existeEx = await AnimalEx.countDocuments({ name: name, team: team }).exec()
        //console.log("existeEx", existeEx)
        if (existeEx == 0) {
            let newAnimal = new AnimalEx({
                name: name,
                sex: sex,
                birthday: birthday,
                type: 'CAPRINO',
                race: race,
                category: category,
                owner: owner,
                breeder: breeder,
                team: dataTeam[0].name,
                ID_team: dataTeam[0]._id,
                register: register,
                tatoo: tatoo,
                asociation: asociation,
                //group: group,
                animalAll_id: animalAll_id,
                best_tits: best_tits, 
                milker: milker
            })
            newAnimal.save(function(error, data){
                if(error){
                    return res.status(400).send({
                        message: err
                    });
                }else{
                    return res.json({ status: 200, message: "Animal registrado" });
                }
            })
        } else {
            let animalEx = await AnimalEx.findOne({ name: name, team: team }).exec()
            await AnimalEx.updateOne({ _id: animalEx._id }, { $set: { best_tits: best_tits, milker: milker } }).exec()
            return res.json({ status: 200, message: "Animal registrado" });
        }
        /* let newAnimal = new AnimalEx({
             name: name,
             sex: sex,
             birthday: birthday,
             type: 'CAPRINO',
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
         });*/
    } catch (error) {
        console.log(error)
        return res.json({ message: "Ups..ocurrió un error!" });
    }

}
module.exports = { list, register }