const mongoose = require('mongoose')
const ResultsREXModel = require('../models/resultRaceEx')
const ResultsREX = mongoose.model('ResultsREX')
const ResultsCebaModel = require('../models/resultsCeba')
const ResultsCeba = mongoose.model('ResultsCeba')
const ResultsMestCatModel = require('../models/resultsMestCategory')
const ResultsMestCat = mongoose.model('ResultsMC')
const ResultsMestGroupModel = require('../models/resultsMestGroup')
const ResultsMestGroup = mongoose.model('ResultsMG')
const ResultsMestRaceModel = require('../models/resultsMestRace')
const ResultsMestRace = mongoose.model('ResultsMR')
const ResultsUbreModel = require('../models/resultsUbre')
const ResultsUbre = mongoose.model('ResultsUbre')
const ResultsOrdenoModel = require('../models/resultsOrdeno')
const ResultsOrdeno = mongoose.model('ResultsOrdeno')

const resultRace = async (req, res) => {
    try {
        let results = await ResultsREX.find({ }).sort({ 'race': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultCeba = async (req, res) => {
    try {
        let results = await ResultsCeba.find({ }).sort({ 'sex': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultMestizasCat = async (req, res) => {
    try {
        let results = await ResultsMestCat.find({ }).sort({ 'category': 1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}
 const resultMestizasGroup = async (req, res) => {
     try{
        let results = await ResultsMestGroup.find({ }).sort({ '_id': 1, }).exec();
        return res.json(results);
     }catch(error){
        console.log(error)

     }
 }

 const resultMestizasRace = async (req, res) => {
    try{
       let results = await ResultsMestRace.find({ }).sort({ '_id': 1, }).exec();
       return res.json(results);
    }catch(error){
       console.log(error)

    }
}

const resultUbre = async (req, res) => {
    try{
        let results = await ResultsUbre.find({ }).sort({ '_id': 1, }).exec();
        return res.json(results);
     }catch(error){
        console.log(error)
 
     }
}

const resultOrdeno = async (req, res) => {
    try {
        let resultsOrdeno = await ResultsOrdeno.
        aggregate([
            {$project:{
                animal:1,
                firts_point:1,
                second_point:1, 
                third_point:1,
                four_point:1, 
                "total":{
                    $sum:[
                        "$firts_point",
                        "$second_point",
                        "$third_point",
                        "$four_point"
                    ]}}},{$sort:{"total":-1}}])
    
        return res.json({resultsOrdeno});
        
    } catch (error) {
        return res.json({status: 400, message: "Ups!...ocurrió un error"});
    }
}

module.exports = { resultRace, resultCeba, resultMestizasCat, resultMestizasGroup, resultMestizasRace, resultUbre, resultOrdeno }