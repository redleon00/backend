var router = require("express").Router();
const { list, register  } = require('../controllers/AnimalMilksController')

router.get('/', list)
router.post('/register', register)
/*router.put('/update/:id', update)
router.post('/deleted/:id', deleted)
router.put('/updateOne/:id', updateOne)
router.get('/listCeba', listCeba)*/

module.exports = router;