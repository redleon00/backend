const mongoose= require('mongoose')
const RaceModel = require('../models/raza')
const Race = mongoose.model('Races')
const CategoryModel = require('../models/categorias')
const Category = mongoose.model('Categorys')
const CompetencyModel = require('../models/competencias')
const Competency = mongoose.model('Competitions')
const sex = ["H", "M"]
const groups = ["MENOR", "JOVEN", "ADULTO"]


const generate =   async (req, res) => { //genera las competencias por categorias
    let categorys = await Category.find({'exhibition':false}).exec();
    var races = await Race.find({}).exec();
    let competition_name = []
    let count = await Competency.countDocuments({type_comp:'CATEGORIA'}).exec()

    let existeRace = await Race.countDocuments({}).exec()
    if(existeRace == 0){
        return res.json({message:"Primero registre las RAZAS antes de crear las competencias"})
    }
    let existeCate = await Category.countDocuments({}).exec()
    if(existeCate == 0){
        return res.json({message:"Primero registre las CATEGORIAS antes de crear las competencias"})
    }
    
    if(count > 0){
        return res.json({message:"Todas las competencias ya fueron creadas"})
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
                            competition_name.push(_sex+" "+_specimen+" "+_race+" "+_category)  
                            let newCompetency = new Competency({
                                class : _class,
                                type_comp : 'categoria'.toUpperCase(), 
                                name : _sex+" "+_specimen+" "+_race+" "+_category,
                                type_animal: _specimen,
                                sex: _sex,
                                race: _race,
                                category: _category,
                                group : _group,
                                pts_first:5,
                                pts_second:3,
                                pts_third:2     
                            })  
                            newCompetency.save()               
                }
                
            }
            
        }
        
    return res.json({data:competition_name, message: "Competencias creadas"})
    

}

const generateGroup = async (req, res) => { //genera las competencias por categorias
    //let categorys = await Category.find({}).exec();
    var races = await Race.find({}).exec();
    
    let competition_name = []
    let count = await Competency.countDocuments({type_comp:'GRUPO'}).exec()
    
    if(count > 0){
        return res.json({message:"Todas las competencias ya fueron creadas"})
    }

        for (let i = 0; i < groups.length; i++) {
            const _group = groups[i];
            for (let j = 0; j < races.length; j++) {
                const _race = races[j].name;
                const _specimen = races[j].tipo;
                for (let k = 0; k < sex.length; k++) {
                    const _sex = sex[k];
                    competition_name.push(_sex+" "+_race+" "+_specimen+" "+_group)  
                    let newCompetency = new Competency({
                        class : 'PUNTUADO',
                        type_comp : 'GRUPO', 
                        name : _sex+" "+_specimen+" "+_race+" "+_group,
                        type_animal: _specimen,
                        sex: _sex,
                        race: _race,
                        group : _group,
                        pts_first:10,
                        pts_second:0,
                        pts_third:0     
                    })  
                    newCompetency.save();
                    
                }
                
            }
            
        }
        
    //console.log(competition_name, competition_name.length)
    return res.json({data:competition_name, message: "Competencias creadas"})
    
}

const generateRace = async (req, res) => { //genera las competencias por categorias
    var races = await Race.find({}).exec();
    let competition_name = []
    let count = await Competency.countDocuments({type_comp:'RAZA'}).exec()
    if(count > 0){
        return res.json({message:"Todas las competencias ya fueron creadas"})
    }

        //for (let i = 0; i < groups.length; i++) {
          //  const _group = groups[i];
            for (let j = 0; j < races.length; j++) {
                const _race = races[j].name;
                const _specimen = races[j].tipo;
                for (let k = 0; k < sex.length; k++) {
                    const _sex = sex[k];
                    competition_name.push(_sex+" "+_race+" "+_specimen)  
                    let newCompetency = new Competency({
                        class : 'PUNTUADO',
                        type_comp : 'RAZA', 
                        name : _sex+" "+_specimen+" "+_race,
                        type_animal: _specimen,
                        sex: _sex,
                        race: _race,
                        pts_first:10,
                        pts_second:5,
                        pts_third:0     
                    })  
                    newCompetency.save();
                    
                }
                
            }
            
       // }
        
    //console.log(competition_name, competition_name.length)
    return res.json({data:competition_name, message: "Competencias creadas"})
    
}

const generateSupreme = async (req, res) => { //genera las competencias por categorias
    //let categorys = await Category.find({}).exec();
    const specimen = ["OVINO", "CAPRINO"]
    
    let competition_name = []
    let count = await Competency.countDocuments({type_comp:'SUPREMO'}).exec()
    
    if(count > 0){
        return res.json({message:"Todas las competencias ya fueron creadas"})
    }

            for (let j = 0; j < specimen.length; j++) {
                const _specimen = specimen[j];
                for (let k = 0; k < sex.length; k++) {
                    const _sex = sex[k];
                    competition_name.push(_sex+" "+_specimen)  
                    let newCompetency = new Competency({
                        class : 'PUNTUADO',
                        type_comp : 'SUPREMO', 
                        name : _sex+" "+_specimen+" "+"SUPREMO",
                        type_animal: _specimen,
                        sex: _sex,
                        pts_first:0,
                        pts_second:0,
                        pts_third:0     
                    })  
                    newCompetency.save();
                    
                }
                
            }
                
                
            
            
        
        
    //console.log(competition_name, competition_name.length)
    return res.json({data:competition_name, message: "Competencias creadas"})
    
}

module.exports = {generate, generateGroup, generateRace, generateSupreme}