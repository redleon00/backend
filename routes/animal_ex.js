var router = require("express").Router();
const { list, register, update, deleted, updateOne, listCeba, listMilker, listUbre, listOrdeno  } = require('../controllers/AnimalExController')

router.get('/', list)
router.post('/register', register)
router.put('/update/:id', update)
router.post('/deleted/:id', deleted)
router.put('/updateOne/:id', updateOne)
router.get('/listCeba', listCeba)
router.get('/listMilker',listMilker)
router.get('/listUbre',listUbre)
router.get('/listOrdeno',listOrdeno)
module.exports = router;