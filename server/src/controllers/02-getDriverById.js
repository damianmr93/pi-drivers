const axios = require("axios");
const { Driver, Team } = require("../db");
const URL_API = require("../utils/url");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const numberRegex = /^[0-9]+$/; // Verificador de números

    if (numberRegex.test(id)) {
      // Verifica que id sea número para hacer peticion api
      const apiDriversResponse = await axios(`${URL_API}/${id}`);

      if (apiDriversResponse.data.id) {
        let { id, name, description, image, nationality, dob, teams } = apiDriversResponse.data;
        if (image.url === "")
          image.url =
            "https://raw.githubusercontent.com/damianmoreira93/driversTerminar/477a8c34e8073e47be0e44dde3003e79bc0a4c28/server/src/assets/img/profileImage.png";

        const apiDriver = {
          id,
          name,
          description,
          image,
          nationality,
          dob,
          teams,
        };

        return res.status(200).json(apiDriver);
      }
    }

    const dbDriver = await Driver.findByPk(id, {
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (dbDriver) {
      res.status(200).json(dbDriver);
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
