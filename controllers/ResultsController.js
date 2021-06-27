const mongoose = require('mongoose')
const ResultCModel = require('../models/resultsCategory')
const ResultsC = mongoose.model('ResultsC')
const ResultGModel = require('../models/resultsGroup')
const ResultsG = mongoose.model('ResultsG')
const ResultRModel = require('../models/resultsRace')
const ResultsR = mongoose.model('ResultsR')
const ResultSModel = require('../models/resultsSupreme')
const ResultsS = mongoose.model('ResultsS')

const resultCategory = async (req, res) => {
    try {
        let results = await ResultCModel.find({ }).sort({ 'race': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultGroup = async (req, res) => {
    try {
        let results = await ResultGModel.find({ }).sort({ 'race': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultRace = async (req, res) => {
    try {
        let results = await ResultRModel.find({ }).sort({ 'race': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}

const resultSupreme = async (req, res) => {
    try {
        let results = await ResultSModel.find({ }).sort({ 'sex': -1, }).exec();
        return res.json(results);
    } catch (error) {
        console.log(error)
    }
}
module.exports = {resultCategory, resultGroup, resultRace, resultSupreme}