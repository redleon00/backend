var router = require("express").Router();
const { list, register, getTeam, update, deleted, numOfTeams } = require('../controllers/TeamController')

router.get('/', list)
router.post('/register', register)
router.get('/getTeam/:id', getTeam)
router.put('/update/:id', update)
router.post('/deleted/:id', deleted)
router.post('/numOfTeams',numOfTeams)

module.exports = router;