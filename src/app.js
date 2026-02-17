//app.js
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");
const routesPath = path.join(__dirname, "routes");

app.use(express.json());
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(`./routes/${file}`);
  app.use("/tasks", route);
});

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API de Task List</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
