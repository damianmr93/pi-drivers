const { Driver, Team } = require("../db");

module.exports = async (req, res) => {
  try {
    let { name, description, image, nationality, dob, teamsId } = req.body;

    if (
      !name.plainForename ||
      !name.plainSurname ||
      !description ||
      !nationality ||
      !dob ||
      !teamsId
    ) return res.status(401).send("Faltan datos");

    const forename =
      name.plainForename.charAt(0).toUpperCase() +
      name.plainForename.slice(1).toLowerCase();

    const surname =
      name.plainSurname.charAt(0).toUpperCase() +
      name.plainSurname.slice(1).toLowerCase();

    const dbTeams = await Team.findAll();

    if (!dbTeams.length) await postTeams();

    if (image.url === "") {
      image.url = "https://raw.githubusercontent.com/oscarsanchog/PI-drivers/main/server/src/assets/img/profileImage.png";
    }

    const driverData = {
      forename: forename,
      surname: surname,
      description: description,
      image: image,
      nationality: nationality,
      dob: dob,
    };

    console.log('Datos del driver:', driverData);

    const newDriver = await Driver.create(driverData);

    await newDriver.addTeams(teamsId);

    console.log('Driver creado:', newDriver);

    res.status(200).json(newDriver);
  } catch (error) {
    console.error('Error al crear driver:', error.message);
    res.status(500).json({ error: error.message });
  }
};
