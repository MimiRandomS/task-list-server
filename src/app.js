//app.js
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");
const routesPath = path.join(__dirname, "routes");
const allowedMethods = ["GET", "POST", "PUT", "DELETE"];

app.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }
  next();
});

app.use(express.json());
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(`./routes/${file}`);
  app.use("/tasks", route);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to a Task List API</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
