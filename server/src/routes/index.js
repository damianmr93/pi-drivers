const { Router } = require("express")
const router = Router()
const getDrivers = require("../controllers/01-getDrivers")
const getDriverById = require("../controllers/02-getDriverById")
const getDriversByName = require('../controllers/03-getDriversByName')
const postDrivers = require('../controllers/04-postDrivers')
const getTeams = require('../controllers/05-getTeams')

//TODO debería separar los handlers de los controlers. En una carpeta poner todos los handlers. Los handlers se los paso a las rutas y los handlers tienen relacioón con los controllers

router.get('/name', getDriversByName)

router.get('/teams', getTeams)

router.get("/", getDrivers)

router.get("/:id", getDriverById)

router.post('/', postDrivers)

module.exports = router