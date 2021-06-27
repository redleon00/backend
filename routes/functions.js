var router = require("express").Router();
const { generate, generateGroup, generateRace, generateSupreme } = require('../controllers/FunctionsController')

router.get('/generate', generate)
router.get('/generateGroup', generateGroup)
router.get('/generateRace',generateRace)
router.get('/generateSupreme',generateSupreme)
module.exports = router;