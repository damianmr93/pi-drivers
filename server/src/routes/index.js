const { Router } = require("express")
const router = Router()
const getDrivers = require("../controllers/getDrivers")
const getDriverById = require("../controllers/getDriverById")
const getDriversByName = require('../controllers/getDriversByName')
const postDrivers = require('../controllers/postDrivers')
const getTeams = require('../controllers/getTeams')


router.get('/name', getDriversByName)

router.get('/teams', getTeams)

router.get("/", getDrivers)

router.get("/:id", getDriverById)

router.post('/', postDrivers)

module.exports = router