var router = require("express").Router();
const { resultRace, resultCeba, resultMestizasCat, resultMestizasGroup, resultMestizasRace, resultUbre, resultOrdeno } = require('../controllers/ResultsExController')


router.get('/resultRace/', resultRace)
router.get('/resultCeba/', resultCeba)
router.get('/resultMestizasCat',resultMestizasCat)
router.get('/resultMestizasGroup',resultMestizasGroup)
router.get('/resultMestizasRace',resultMestizasRace)
router.get('/resultUbre',resultUbre)
router.get('/resultOrdeno',resultOrdeno)

module.exports = router;