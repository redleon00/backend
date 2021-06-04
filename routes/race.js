var router = require("express").Router();
const { list, register , update, deleted } = require('../controllers/RaceController')

router.get('/', list)
router.post('/register', register)
router.put('/update/:id', update)
router.post('/deleted/:id', deleted)


module.exports = router;