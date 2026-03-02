// auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authService = require("../service/authService");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = authService.authenticate(email, password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: JWT_EXPIRES },
  );
  res.json({ token });
});

router.get("/admin", authMiddleware, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Forbidden" });
    }
    res.json({ message: "Welcome, admin!" });
});

module.exports = router;
