const { Team } = require("../db")
const postTeams = require('./postTeams')

module.exports = async (req, res) => {
  try {
    const dbTeams = await Team.findAll()
    //preguntar a andyi
    if (!dbTeams.length) {// si la petición de arriba me arrojó un array vacío es porque no hay teams y los crea desde la api
      await postTeams()
      const createdTeams = await Team.findAll()
      return res.status(200).json(createdTeams)
    }

    res.status(200).json(dbTeams)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
