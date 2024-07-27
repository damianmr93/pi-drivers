const { Driver, Team } = require("../db")
const { postTeams } = require("./postTeams")

module.exports = async (req, res) => {
  try {
    let { name, description, image, nationality, dob, teamsId } = req.body

    if (
      !name.plainForename ||
      !name.plainSurname ||
      !description ||
      !nationality ||
      !dob ||
      !teamsId
    ) return res.status(401).send("Faltan datos")

    const forename =
      name.plainForename.charAt(0).toUpperCase() +
      name.plainForename.slice(1).toLowerCase()

    const surname =
      name.plainSurname.charAt(0).toUpperCase() +
      name.plainSurname.slice(1).toLowerCase()

    const dbTeams = await Team.findAll()

    if (!dbTeams.length) await postTeams()

    if (image.url === "") {
      image.url = "https://raw.githubusercontent.com/damianmoreira93/driversTerminar/477a8c34e8073e47be0e44dde3003e79bc0a4c28/server/src/assets/img/profileImage.png"
    }
    
    const [newDriver, created] = await Driver.findOrCreate({
      where: {
        name: { forename, surname },
        description,
        image,
        nationality,
        dob,
      },
    })
    await newDriver.addTeams(teamsId)

    res.status(200).json(newDriver)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}