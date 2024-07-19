const axios = require("axios");
const { Driver, Team } = require("../db");
const URL_API = require("../utils/url");

module.exports = async (req, res) => {
  try {
    console.log("Fetching drivers from database...");
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
    console.log("Database drivers fetched:", dbDrivers.length);

    console.log("Fetching drivers from API...");
    let { data: apiDrivers } = await axios(URL_API);
    console.log("API drivers fetched:", apiDrivers.length);

    apiDrivers.forEach((driver) => {
      if (driver.image.url === "")
        driver.image.url =
          "https://raw.githubusercontent.com/damianmoreira93/driversTerminar/477a8c34e8073e47be0e44dde3003e79bc0a4c28/server/src/assets/img/profileImage.png";
    });

    const allDrivers = [...dbDrivers, ...apiDrivers];
    console.log("Total drivers combined:", allDrivers.length);

    res.status(200).json(allDrivers);
  } catch (error) {
    console.error("Error in getDrivers:", error.message);
    res.status(500).json({ error: error.message });
  }
};
