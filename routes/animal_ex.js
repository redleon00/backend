var router = require("express").Router();
const { list, register, update, deleted, updateOne  } = require('../controllers/AnimalExController')

router.get('/', list)
router.post('/register', register)
router.put('/update/:id', update)
router.post('/deleted/:id', deleted)
router.put('/updateOne/:id', updateOne)


module.exports = router;