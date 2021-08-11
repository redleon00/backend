const mongoose = require('mongoose')
const ResultCModel = require('../models/resultsCategory')
const ResultsC = mongoose.model('ResultsC')
const ResultGModel = require('../models/resultsGroup')
const ResultsG = mongoose.model('ResultsG')
const ResultRModel = require('../models/resultsRace')
const ResultsR = mongoose.model('ResultsR')
const ResultSModel = require('../models/resultsSupreme')
const ResultsS = mongoose.model('ResultsS')

const TablaExpoOviModel = require('../models/puntos_expo_ovino')
const TablaExpoOvi = mongoose.model('PtsExpoOvi')
const TablaExpoCapriModel = require('../models/puntos_expo_caprino')
const TablaExpoCapri = mongoose.model('PtsExpoCapri')
const TablaCriaOviModel = require('../models/puntos_criador_ovino')
const TablaCriaOvi = mongoose.model('PtsCriaOvi')
const TablaCriaCapriModel = require('../models/puntos_criador_caprino')
const TablaCriaCapri = mongoose.model('PtsCriaCapri')
const TablaAsocOviModel = require('../models/puntos_asoc_ovi')
const TablaAsocOvi = mongoose.model('PtsAsocOvi')
const TablaAsocCapriModel = require('../models/puntos_asoc_capri')
const TablaAsocCapri = mongoose.model('PtsAsocCapri')

const resultCategory = async (req, res) => {
    try {
        let results = await ResultsC.find({ }).sort({ '_id': 1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultGroup = async (req, res) => {
    try {
        let results = await ResultsG.find({ }).sort({ 'race': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultRace = async (req, res) => {
    try {
        let results = await ResultsR.find({ }).sort({ 'race': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultSupreme = async (req, res) => {
    try {
        let results = await ResultsS.find({ }).sort({ 'sex': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultExpo = async (req, res) => {    
    try {
        let resultsExpoOvi = await TablaExpoOvi.
        aggregate([
            {$project:{
                participant:1, 
                team:1,
                primero_category:1,
                segundo_category:1, 
                tercero_category:1,
                menor:1, 
                joven:1, 
                adulto:1, 
                raza:1, 
                reservado:1, 
                "total":{
                    $sum:[
                        "$primero_category",
                        "$segundo_category",
                        "$tercero_category",
                        "$menor",
                        "$joven",
                        "$adulto",
                        "$raza",
                        "$reservado"
                    ]}}},{$sort:{"total":-1}}])
        
        let resultsExpoCapri = await TablaExpoCapri.
        aggregate([
            {$project:{
                participant:1, 
                team:1,
                primero_category:1,
                segundo_category:1, 
                tercero_category:1,
                menor:1, 
                joven:1, 
                adulto:1, 
                raza:1, 
                reservado:1, 
                ubre:1,
                ordeno:1,
                "total":{
                    $sum:[
                        "$primero_category",
                        "$segundo_category",
                        "$tercero_category",
                        "$menor",
                        "$joven",
                        "$adulto",
                        "$raza",
                        "$reservado",
                        "$ubre",
                        "$ordeno"
                    ]}}},{$sort:{"total":-1}}])


        return res.json({dataExpoOvi:resultsExpoOvi, dataExpoCapri:resultsExpoCapri});
    } catch (error) {
        console.log(error)
    }
}

const resultCria = async (req, res) => {    
    try {
        let resultsCriaOvi = await TablaCriaOvi.
        aggregate([
            {$project:{
                participant:1, 
                team:1,
                primero_category:1,
                segundo_category:1, 
                tercero_category:1,
                menor:1, 
                joven:1, 
                adulto:1, 
                raza:1, 
                reservado:1, 
                "total":{
                    $sum:[
                        "$primero_category",
                        "$segundo_category",
                        "$tercero_category",
                        "$menor",
                        "$joven",
                        "$adulto",
                        "$raza",
                        "$reservado"
                    ]}}},{$sort:{"total":-1}}])
        
        let resultsCriaCapri = await TablaCriaCapri.
        aggregate([
            {$project:{
                participant:1, 
                team:1,
                primero_category:1,
                segundo_category:1, 
                tercero_category:1,
                menor:1, 
                joven:1, 
                adulto:1, 
                raza:1, 
                reservado:1, 
                ubre:1,
                ordeno:1,
                "total":{
                    $sum:[
                        "$primero_category",
                        "$segundo_category",
                        "$tercero_category",
                        "$menor",
                        "$joven",
                        "$adulto",
                        "$raza",
                        "$reservado",
                        "$ubre",
                        "$ordeno"
                    ]}}},{$sort:{"total":-1}}])


        return res.json({dataCriaOvi:resultsCriaOvi, dataCriaCapri:resultsCriaCapri});
    } catch (error) {
        console.log(error)
    }
}

const resultAsoc = async (req, res) => {    
    try {
        let resultsAsocOvi = await TablaAsocOvi.
        aggregate([
            {$project:{
                name:1,
                primero_category:1,
                segundo_category:1, 
                tercero_category:1,
                menor:1, 
                joven:1, 
                adulto:1, 
                raza:1, 
                reservado:1, 
                "total":{
                    $sum:[
                        "$primero_category",
                        "$segundo_category",
                        "$tercero_category",
                        "$menor",
                        "$joven",
                        "$adulto",
                        "$raza",
                        "$reservado"
                    ]}}},{$sort:{"total":-1}}])
        
        let resultsAsocCapri = await TablaAsocCapri.
        aggregate([
            {$project:{
                name:1,
                primero_category:1,
                segundo_category:1, 
                tercero_category:1,
                menor:1, 
                joven:1, 
                adulto:1, 
                raza:1, 
                reservado:1, 
                ubre:1,
                ordeno:1,
                "total":{
                    $sum:[
                        "$primero_category",
                        "$segundo_category",
                        "$tercero_category",
                        "$menor",
                        "$joven",
                        "$adulto",
                        "$raza",
                        "$reservado",
                        "$ubre",
                        "$ordeno"
                    ]}}},{$sort:{"total":-1}}])


        return res.json({dataAsocOvi:resultsAsocOvi, dataAsocCapri:resultsAsocCapri});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {resultCategory, resultGroup, resultRace, resultSupreme, resultExpo, resultCria, resultAsoc}