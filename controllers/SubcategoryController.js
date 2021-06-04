const mongoose= require('mongoose')
const SubCategoryModel = require('../models/subcategorias')
const Subcategory = mongoose.model('Subcategorys')

const register = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const category = req.body.category;
     
        let newSubcategory = new Subcategory({
            name : name, 
            category : category
        })
        newSubcategory.save(function(err, subcategory) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
            
                return res.json({subcategory, message: "Subcategoria registrada"});
            }
        });


}

const list =   async (req, res) => {
    try {
        let subcategorys = await Subcategory.find({}).exec();
        return res.json(subcategorys);    
    } catch (error) {
        console.log(error)
    }
}

const deleted = async (req, res) => {
    const id = req.params.id
    try {
        let subcategorys = await Subcategory.deleteOne({ '_id': id }).exec();
        return res.json({ subcategorys, message: "Subcategoria eliminada" });    
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const id = req.params.id
    const name = req.body.name.toUpperCase()
    const category = req.body.category;
 
try {
    let subcategorys = await Subcategory.updateOne({ '_id': id },{ $set :{'name': name, 'category':category, updated_at: new Date() } }).exec();
    return res.json({ subcategorys, message: "Categoria actualizada" });    
} catch (error) {
    console.log(error)
}
}
module.exports = {register, list, deleted, update}
