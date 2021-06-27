var router = require("express").Router();
const { reset } = require('../controllers/BdController')

router.post('/', reset)

module.exports = router;