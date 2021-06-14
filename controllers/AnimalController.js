const mongoose = require('mongoose')
const AnimalModel = require('../models/animales')
const Animal = mongoose.model('Animals')
const TeamModel = require('../models/equipos').default
const Team = mongoose.model('Teams')

//Animal for competition register
const register = async (req, res) => {
    console.log(req.body)
    const name = req.body.name.toUpperCase();
    const sex = req.body.sex;
    const birthday = req.body.birthday;
    const type = req.body.type;
    const race = req.body.race.name;
    const category = req.body.categoria;
    const owner = req.body.owner;
    const breeder = req.body.breeder.name;
    const team = req.body.team;
    const ID_team = req.body.ID_team;
    const register = req.body.register.toUpperCase();
    const tatoo = req.body.tatoo.toUpperCase();
    let newAnimal = new Animal({
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
        tatoo: tatoo
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


}

const list = async (req, res) => {
    try {
        let animals = await Animal.find({}).exec();
        return res.json(animals);
    } catch (error) {
        console.log(error)
    }


}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let animal = await Animal.deleteOne({ '_id': id }).exec();
        return res.json({ animal, message: "Animal eliminado" });
    } catch (error) {
        console.log(error)
    }
}

const update = async (req, res) => {

    const name = req.body.name.toUpperCase();
    const sex = req.body.sex;
    const birthday = req.body.birthday;
    const race = req.body.race;
    const category = req.body.categoria;
    const breeder = req.body.breeder;
    const register = req.body.register.toUpperCase();
    const tatoo = req.body.tatoo.toUpperCase();

    try {
        let animal = await Animal.updateOne(
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
    if (changeTeam) {
        let numAnimals = await Team.countDocuments({ name: team.name }).exec()
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
        let animal = await Animal.updateOne({ '_id': req.params.id }, { $set: {'name':name, 'sex':sex, 'race':race, 'category':category, 'owner':owner, 'breeder':breeder, 'register':register, 'tatoo':tatoo, 'team':team, 'birthday':birthday} }).exec();
        return res.json({ animal, message: "Animal actualizado" });

    }


}
module.exports = { register, list, deleted, update, updateOne }