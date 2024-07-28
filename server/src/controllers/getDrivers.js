const axios = require("axios");
const { Driver, Team } = require("../db");
const URL_API = require("../utils/url");

module.exports = async (req, res) => {
  try {
    const dbDrivers = await Driver.findAll({
      include: {
        model: Team,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
      attributes: ['id', 'name', 'description', 'image', 'nationality', 'dob']
    });
  
    let { data: apiDrivers } = await axios(URL_API);

    apiDrivers.forEach((driver) => {
      if (driver.image.url === "")
        driver.image.url =
          "https://raw.githubusercontent.com/damianmr93/pi-drivers/main/server/src/assets/img/profileImage.png";
    });

    const allDrivers = [...dbDrivers, ...apiDrivers]

    res.status(200).json(allDrivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
