const axios = require("axios")
const { Team } = require("../db")

const URL_API = require("../utils/url")

module.exports = async () => {
    const { data: apiDrivers } = await axios(URL_API)
    const uniqueTeams = new Set()
  
    apiDrivers
      .filter((driver) => driver.teams) // filtra los drivers que sí tienen teams declarados (no es undefined)
      .map((driver) => driver.teams.split(",")) // filter  devuelve un arr con obj (con los teams de los drivers) y a los strings dentro de los array los separo por cada ','
      .flat() // Uno los strings en un solo array
      .map((teamString) => teamString.trim()) // normalizo cada string del array para que no haya espacios ni adelante ni atras
      .forEach(team => uniqueTeams.add(team)) // los agrego al set y elimino los repetidos
  
    uniqueTeams.forEach((team) =>  Team.findOrCreate({ where: { name: team } })) // Recorre el set y los agrega a la db
  }