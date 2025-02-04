const axios = require("axios");
const { Driver, Team } = require("../db");
const URL_API = require("../utils/url");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const numberRegex = /^[0-9]+$/;

    if (numberRegex.test(id)) {
      const apiDriversResponse = await axios(`${URL_API}/${id}`);

      if (apiDriversResponse.data.id) {
        let { id, name, description, image, nationality, dob, teams } = apiDriversResponse.data;
        if (image.url === "")
          image.url =
            "https://raw.githubusercontent.com/damianmr93/pi-drivers/main/server/src/assets/img/profileImage.png";

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
