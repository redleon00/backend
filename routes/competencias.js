var router = require("express").Router();
const { listCategoria, listGroup, listRace, listSupreme, saveCategoryC, categoryWinners, saveGroupC, groupWinners, saveGroupR, raceWinners, saveGroupS } = require('../controllers/CompetitionController')

router.get('/listCategoria/', listCategoria)
router.get('/listGroup', listGroup)
router.get('/listRace', listRace)
router.get('/listSupreme',listSupreme)
router.post('/saveCategoryC', saveCategoryC)
router.get('/categoryWinners',categoryWinners)
router.post('/saveGroupC',saveGroupC)
router.get('/groupWinners',groupWinners)
router.post('/saveGroupR',saveGroupR)
router.get('/raceWinners',raceWinners)
router.post('/saveGroupS',saveGroupS)
//router.post('/deleted/:id', deleted)

module.exports = router;