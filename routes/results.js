var router = require("express").Router();
const { resultCategory, resultGroup, resultRace, resultSupreme, resultExpo, resultCria, resultAsoc  } = require('../controllers/ResultsController')

router.get('/resultCategory/', resultCategory)
router.get('/resultGroup/', resultGroup)
router.get('/resultRace/', resultRace)
router.get('/resultSupreme/', resultSupreme)
router.get('/resultExpo/', resultExpo)
router.get('/resultCria/',resultCria)
router.get('/resultAsoc/', resultAsoc)
module.exports = router;