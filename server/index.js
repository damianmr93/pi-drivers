const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: false })  // Esto borra y recrea las tablas, CUIDADO!!!
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  })
  .catch((error) => console.error(error));