//app.js
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
const connectDB = require("./database/db");
connectDB();
app.use(express.json());

app.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }
  next();
});

app.use("/tasks", require("./routes/listEditRouter"));
app.use("/tasks", require("./routes/listViewRouter"));
app.use("/users", require("./routes/userRouter"));
app.use("/", require("./routes/authRouter"));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to a Task List API</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
