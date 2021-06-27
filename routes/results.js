var router = require("express").Router();
const { resultCategory, resultGroup, resultRace, resultSupreme  } = require('../controllers/ResultsController')

router.get('/resultCategory/', resultCategory)
router.get('/resultGroup/', resultGroup)
router.get('/resultRace/', resultRace)
router.get('/resultSupreme/', resultSupreme)

module.exports = router;