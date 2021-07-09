const mongoose = require('mongoose')
const RaceModel = require('../models/raza')
const Race = mongoose.model('Races')
const CategoryModel = require('../models/categorias')
const Category = mongoose.model('Categorys')
const CompetencyModel = require('../models/competencias')
const Competency = mongoose.model('Competitions')
const CompetencyExModel = require('../models/competenciasEx')
const CompetencyEx = mongoose.model('CompetitionsEx')
const AnimalExModel = require('../models/animales_ex')
const AnimalEx = mongoose.model('AnimalsEx')
const AnimalModel = require('../models/animales')
const Animal = mongoose.model('Animals')
const PuntosCriaCapriModel = require('../models/puntos_criador_caprino')
const PtsCriaCapri = mongoose.model('PtsCriaCapri')
const sex = ["H", "M"]
const groups = ["MENOR", "JOVEN", "ADULTO"]


const generate = async (req, res) => { //genera las competencias por categorias
    let categorys = await Category.find({ exhibition: false }).exec();
    var races = await Race.find({}).exec();
    let competition_name = []
    let count = await Competency.countDocuments({ type_comp: 'CATEGORIA' }).exec()

    let existeRace = await Race.countDocuments({ clase: false }).exec() //false no es raza de exhibicion
    if (existeRace == 0) {
        return res.json({ message: "Primero registre las RAZAS antes de crear las competencias" })
    }
    let existeCate = await Category.countDocuments({}).exec()
    if (existeCate == 0) {
        return res.json({ message: "Primero registre las CATEGORIAS antes de crear las competencias" })
    }

    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }
    for (let k = 0; k < categorys.length; k++) {
        let _category = categorys[k].name;
        let _group = categorys[k].group;
        let _class = (categorys[k].exhibition == true) ? 'EXHIBICION' : 'PUNTUADO'
        for (let l = 0; l < races.length; l++) {
            let _race = races[l].name;
            let _specimen = races[l].tipo;

            for (let i = 0; i < sex.length; i++) {
                let _sex = sex[i];
                competition_name.push(_sex + " " + _specimen + " " + _race + " " + _category)
                let newCompetency = new Competency({
                    class: _class,
                    type_comp: 'categoria'.toUpperCase(),
                    name: _sex + " " + _specimen + " " + _race + " " + _category,
                    type_animal: _specimen,
                    sex: _sex,
                    race: _race,
                    category: _category,
                    group: _group,
                    pts_first: 5,
                    pts_second: 3,
                    pts_third: 2
                })
                newCompetency.save()
            }

        }

    }

    return res.json({ data: competition_name, message: "Competencias creadas" })


}

const generateGroup = async (req, res) => { //genera las competencias por categorias
    //let categorys = await Category.find({}).exec();
    var races = await Race.find({}).exec();

    let competition_name = []
    let count = await Competency.countDocuments({ type_comp: 'GRUPO' }).exec()

    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }

    for (let i = 0; i < groups.length; i++) {
        const _group = groups[i];
        for (let j = 0; j < races.length; j++) {
            const _race = races[j].name;
            const _specimen = races[j].tipo;
            for (let k = 0; k < sex.length; k++) {
                const _sex = sex[k];
                competition_name.push(_sex + " " + _race + " " + _specimen + " " + _group)
                let newCompetency = new Competency({
                    class: 'PUNTUADO',
                    type_comp: 'GRUPO',
                    name: _sex + " " + _specimen + " " + _race + " " + _group,
                    type_animal: _specimen,
                    sex: _sex,
                    race: _race,
                    group: _group,
                    pts_first: 10,
                    pts_second: 0,
                    pts_third: 0
                })
                newCompetency.save();

            }

        }
    }
    return res.json({ data: competition_name, message: "Competencias creadas" })

}

const generateRace = async (req, res) => { //genera las competencias por categorias
    var races = await Race.find({}).exec();
    let competition_name = []
    let count = await Competency.countDocuments({ type_comp: 'RAZA' }).exec()
    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }

    for (let j = 0; j < races.length; j++) {
        const _race = races[j].name;
        const _specimen = races[j].tipo;
        for (let k = 0; k < sex.length; k++) {
            const _sex = sex[k];
            competition_name.push(_sex + " " + _race + " " + _specimen)
            let newCompetency = new Competency({
                class: 'PUNTUADO',
                type_comp: 'RAZA',
                name: _sex + " " + _specimen + " " + _race,
                type_animal: _specimen,
                sex: _sex,
                race: _race,
                pts_first: 10,
                pts_second: 5,
                pts_third: 0
            })
            newCompetency.save();
        }
    }
    return res.json({ data: competition_name, message: "Competencias creadas" })

}

const generateSupreme = async (req, res) => { //genera las competencias por categorias
    //let categorys = await Category.find({}).exec();
    const specimen = ["OVINO", "CAPRINO"]

    let competition_name = []
    let count = await Competency.countDocuments({ type_comp: 'SUPREMO' }).exec()

    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }

    for (let j = 0; j < specimen.length; j++) {
        const _specimen = specimen[j];
        for (let k = 0; k < sex.length; k++) {
            const _sex = sex[k];
            competition_name.push(_sex + " " + _specimen)
            let newCompetency = new Competency({
                class: 'PUNTUADO',
                type_comp: 'SUPREMO',
                name: _sex + " " + _specimen + " " + "SUPREMO",
                type_animal: _specimen,
                sex: _sex,
                pts_first: 0,
                pts_second: 0,
                pts_third: 0
            })
            newCompetency.save();

        }

    }






    //console.log(competition_name, competition_name.length)
    return res.json({ data: competition_name, message: "Competencias creadas" })

}

// competencias de exhibicion 
const generateEx = async (req, res) => { //genera las competencias por categorias
    const specimen = ["OVINO", "CAPRINO"]
    const category = await Category.find({ exhibition: true }).exec()
    let competition_name = []
    let count = await CompetencyEx.countDocuments({ type_comp: 'CATEGORIA' }).exec()

    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }
    for (let i = 0; i < category.length; i++) {
        const cate = category[i].name;
        for (let j = 0; j < specimen.length; j++) {
            const _specimen = specimen[j];
            for (let k = 0; k < sex.length; k++) {
                const _sex = sex[k];
                competition_name.push(_sex + " " + _specimen)
                let newCompetency = new CompetencyEx({
                    class: 'EXHIBICION',
                    type_comp: 'CATEGORIA',
                    name: _sex + " " + _specimen + " " + cate,
                    type_animal: _specimen,
                    sex: _sex,
                    category: cate,
                    pts_first: 0,
                    pts_second: 0,
                    pts_third: 0
                })
                newCompetency.save();

            }

        }
    }
    return res.json({ data: competition_name, message: "Competencias creadas" })

}

const generateExCeba = async (req, res) => { //genera las competencias por categorias

    let competition_name = []
    let _type_comp = 'CEBA'
    let _specimen = 'OVINO'
    let count = await CompetencyEx.countDocuments({ type_comp: _type_comp }).exec()

    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }
    for (let k = 0; k < sex.length; k++) {
        const _sex = sex[k];
        competition_name.push(_sex + " " + _specimen)
        let newCompetency = new CompetencyEx({
            class: 'EXHIBICION',
            type_comp: _type_comp,
            name: _sex + " " + _type_comp,
            type_animal: _specimen,
            sex: _sex,
            category: '',
            pts_first: 0,
            pts_second: 0,
            pts_third: 0
        })
        newCompetency.save();

    }

    return res.json({ data: competition_name, message: "Competencias creadas" })

}


//Generate Mestizas Lecheras competitions
const generateMestizas = async (req, res) => { //genera las competencias por categorias
    let categorys = await Category.find({ exhibition: false }).exec();
    var races = await Race.find({clase: true, tipo:'CAPRINO'}).exec();
    let competition_name = []
    let count = await Competency.countDocuments({ type_comp: 'MESTIZAS' }).exec()

    let existeRace = await Race.countDocuments({ clase: true, tipo:'CAPRINO' }).exec() //false no es raza de exhibicion
    if (existeRace == 0) {
        return res.json({ message: "Primero registre las RAZAS antes de crear las competencias" })
    }
    let existeCate = await Category.countDocuments({}).exec()
    if (existeCate == 0) {
        return res.json({ message: "Primero registre las CATEGORIAS antes de crear las competencias" })
    }

    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }
    for (let k = 0; k < categorys.length; k++) {
        let _category = categorys[k].name;
        let _group = categorys[k].group;
        let _class = (categorys[k].exhibition == true) ? 'EXHIBICION' : 'PUNTUADO'
        for (let l = 0; l < races.length; l++) {
            let _race = races[l].name;
            let _specimen = races[l].tipo;

            for (let i = 0; i < 1; i++) {
                let _sex = 'H';
                competition_name.push(_sex + " " + _specimen + " " + _race + " " + _category)
                let newCompetency = new CompetencyEx({
                    class: _class,
                    type_comp: 'MESTIZAS',
                    name: _sex + " " + _specimen + " " + _race + " " + _category,
                    type_animal: _specimen,
                    sex: _sex,
                    race: _race,
                    category: _category,
                    group: _group,
                    pts_first: 0,
                    pts_second: 0,
                    pts_third: 0
                })
                newCompetency.save()
            }

        }

    }

    return res.json({ data: competition_name, message: "Competencias de Mestizas creadas" })


}

const generateGroupMestizas = async (req, res) => { //genera las competencias por categorias
    //let categorys = await Category.find({}).exec();
    var races = await Race.find({clase: true, tipo:'CAPRINO'}).exec();

    let competition_name = []
    let count = await CompetencyEx.countDocuments({ type_comp: 'MESTIZAS' }).exec()

    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }

    for (let i = 0; i < groups.length; i++) {
        const _group = groups[i];
        for (let j = 0; j < races.length; j++) {
            const _race = races[j].name;
            const _specimen = races[j].tipo;
            for (let k = 0; k < 1; k++) {
                const _sex = 'H';
                competition_name.push(_sex + " " + _race + " " + _specimen + " " + _group)
                let newCompetency = new CompetencyEx({
                    class: 'EXHIBICION',
                    type_comp: 'GRUPO',
                    name: _sex + " " + _specimen + " " + _race + " " + _group,
                    type_animal: _specimen,
                    sex: _sex,
                    race: _race,
                    group: _group,
                    pts_first: 10,
                    pts_second: 0,
                    pts_third: 0
                })
                newCompetency.save();

            }

        }

    }
    //console.log(competition_name, competition_name.length)
    return res.json({ data: competition_name, message: "Competencias creadas" })
}

const generateRaceMestizas = async (req, res) => { //genera las competencias finales de Mestizas Lecheras
    var races = await Race.find({clase: true, tipo:'CAPRINO'}).exec();
    let competition_name = []
    let count = await Competency.countDocuments({ type_comp: 'MESTIZAS' }).exec()
    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }

    for (let j = 0; j < races.length; j++) {
        const _race = races[j].name;
        const _specimen = races[j].tipo;
        for (let k = 0; k < 1; k++) {
            const _sex = 'H';
            competition_name.push(_sex + " " + _race + " " + _specimen)
            let newCompetency = new CompetencyEx({
                class: 'EXHIBICION',
                type_comp: 'RAZA',
                name: _sex + " " + _specimen + " " + _race,
                type_animal: _specimen,
                sex: _sex,
                race: _race,
                pts_first: 0,
                pts_second: 0,
                pts_third: 0
            })
            newCompetency.save();
        }
    }
    return res.json({ data: competition_name, message: "Competencias creadas" })

}

const betterTitsComp = async (req, res) => {
    try {
        let count = await Competency.countDocuments({ type_comp: 'UBRE' }).exec()
    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }
    const _sex = 'H';
    let newCompetency = new CompetencyEx({
        class: 'EXHIBICION',
        type_comp: 'UBRE',
        name: "MEJOR UBRE CAPRINO",
        type_animal: 'CAPRINO',
        sex: _sex,
        race: '',
        pts_first: 15,
        pts_second: 10,
        pts_third: 5
    })
    newCompetency.save();
    return res.json({ message: "Competencias Mejor Ubre creadas" })    
    } catch (error) {
        console.log(error)
    }
    
}

const milkerComp = async (req, res) => {
    const type_animal = ["PRIMIPARAS", "MULTIPARAS"]
    let competition_name = []
    const _sex = 'H';
    let count = await Competency.countDocuments({ type_comp: 'ORDEÑO' }).exec()
    if (count > 0) {
        return res.json({ message: "Todas las competencias ya fueron creadas" })
    }
    for (let i = 0; i < type_animal.length; i++) {
        const element = type_animal[i];
        
        let newCompetency = new CompetencyEx({
            class: 'EXHIBICION',
            type_comp: 'ORDEÑO',
            name:" COMPETENCIA DE ORDEÑO " + element + " CAPRINO",
            type_animal: 'CAPRINO',
            sex: _sex,
            race: '',
            pts_first: 15,
            pts_second: 10,
            pts_third: 5
        })
        newCompetency.save();
        return res.json({ message: "Competencias de Ordeño creadas" })
        
    }
  
}

const getAnimalsExcel = async (req, res) => {
    var allAnimals = await Animal.find({type:'OVINO'}).sort({team:1, category: 1, sex:1}).exec()
    return res.json({allAnimals })
}

const getAnimalsExcel2 = async (req, res) => {
    var allAnimalsEx = await AnimalEx.find({type:'OVINO'}).sort({team:1, category: 1, sex:1}).exec()
    return res.json({allAnimalsEx })
}

const genCria = async (req, res) => {
    let caprinos = await Animal.find({type:'CAPRINO'}).exec()
    //console.log("cantidad de animales", caprinos)
    caprinos.forEach(async function(x){
        let i = 0

        
        let criador = x.breeder
        //console.log("criador ", x.breeder)
        let existe = await PtsCriaCapri.countDocuments({participant: criador}).exec();
        console.log("existe", existe)
        if(existe == 0){
            let xx = new PtsCriaCapri({
                participant:criador
            })
            console.log("datos", xx)
            xx.save(function (err, animal) { 
             if (err) {
                return res.status(400).send({
                    message: err, type:"error"
                });
            } else {
    
                return res.json({ status: 200, message: "Criador registrado", type: "success" });
            }
        });
            //return res.json({ status: 200, message: "Criador Creado", type:"success" });
        }else{
            //return res.json({ status: 400, message: "Criador YA existe!" , type:"error"});
        }
    })
    //return res.json({ status: 200, message: "Criador Creado", type:"success" });
}

module.exports = { generate, generateGroup, generateRace, generateSupreme, generateEx, generateExCeba, generateMestizas, generateGroupMestizas, generateRaceMestizas, getAnimalsExcel, getAnimalsExcel2, genCria, betterTitsComp, milkerComp }