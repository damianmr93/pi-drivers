const axios = require("axios");
const { Driver, Team } = require("../db");
const URL_API = require("../utils/url");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const query = req.query.name;
    const name = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
    console.log("driver buscado", query);

    // Database
    const dbDrivers = await Driver.findAll({
      where: {
        [Op.or]: [
          { 'name.forename': { [Op.iLike]: `%${name}%` } },
          { 'name.surname': { [Op.iLike]: `%${name}%` } }
        ],
      },
      include: {
        model: Team,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      }
         
    });

    
    // API
    const { data: apiDriversForename } = await axios.get(
      `${URL_API}?name.forename=${name}`
    );

    const { data: apiDriversSurname } = await axios.get(
      `${URL_API}?name.surname=${name}`
    );

    const driversFound = [...dbDrivers, ...apiDriversForename, ...apiDriversSurname ]
    if (driversFound.length === 0) {
      return res.status(404).json({ message: "No se encontraron conductores con ese nombre." });
    }

    res.status(200).json(driversFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
