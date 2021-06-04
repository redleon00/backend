const mongoose= require('mongoose')
const AnimalModel = require('../models/animales')
const Animal = mongoose.model('Animals')

//Animal for competition register
const register = async (req, res) => {
    console.log(req.body.owner)
    const name = req.body.name.toUpperCase();
    const sex = req.body.sex;
    const race = req.body.race;
    const category = req.body.category.toUpperCase();
    const subcategory = req.body.subcategory.toUpperCase();
    const owner = req.body.owner.toUpperCase();
    const breeder = req.body.breeder.toUpperCase(); 
    console.log(owner)
        let newAnimal = new Animal({
            name : name, 
            sex : sex, 
            race : race, 
            category : category, 
            subcategory : subcategory, 
            owner : owner, 
            breeder: breeder
        })
        newAnimal.save(function(err, animal) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
            
                return res.json({status:200, message: "Animal registrado"});
            }
        });


}

const list =   async (req, res) => {
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

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase();
    const sex = req.body.sex;
    const race = req.body.race;
    const category = req.body.category.toUpperCase();
    const subcategory = req.body.subcategory.toUpperCase();
    const owner = req.body.owner.toUpperCase();
    const breeder = req.body.breeder.toUpperCase(); 
 
try {
    let animal = await Animal.updateOne(
        { '_id': id },
        { $set :
            {   'name': name,
                'sex' : sex, 
                'race' : race, 
                'category' : category, 
                'subcategory' : subcategory, 
                'owner' : owner, 
                'breeder': breeder ,
                updated_at: new Date() 
        } 
    }).exec();
    return res.json({ animal, message: "Animal actualizado" });    
} catch (error) {
    console.log(error)
}
}
module.exports = {register, list, deleted, update}