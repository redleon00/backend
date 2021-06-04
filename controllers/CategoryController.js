const mongoose= require('mongoose')
const CategoryModel = require('../models/categorias')
const Category = mongoose.model('Categorys')

const register = async (req, res) => {
    const name = req.body.name.toUpperCase();
     
        let newCategory = new Category({
            name : name,         
        })
        newCategory.save(function(err, category) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
            
                return res.json({category, status:200, message: "Categoria registrada"});
            }
        });


}

const list =   async (req, res) => {
    try {
        let categorys = await Category.find({}).exec();
        return res.json(categorys);    
    } catch (error) {
        console.log(error)
    }
}
const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let categorys = await Category.deleteOne({ '_id': id }).exec();
        return res.json({ categorys, message: "Categoria eliminada" });    
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
 
try {
    let categorys = await Category.updateOne({ '_id': id },{ $set :{'name': name, updated_at: new Date() } }).exec();
    return res.json({ categorys, message: "Categoria actualizada" });    
} catch (error) {
    console.log(error)
}
}
module.exports = {register, list, deleted, update}