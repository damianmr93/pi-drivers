const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use('/drivers', router);

server.use("*", (req, res) => { // Envía un error 404 por defecto si es que la ruta ingresada no existe
    res.status(404).json({ error: "Not found" })
  })

module.exports = server;