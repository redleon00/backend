var router = require("express").Router();
const { list, deleted, listCapri  } = require('../controllers/AnimalAllController')

router.get('/', list)
router.post('/deleted/:id', deleted)
router.get('/listCapri',listCapri)
/*router.post('/register', register)
router.put('/update/:id', update)

router.put('/updateOne/:id', updateOne)
router.get('/listCeba', listCeba)*/

module.exports = router;