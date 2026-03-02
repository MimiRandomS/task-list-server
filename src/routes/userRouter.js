//userRouter.js
const express = require("express");
const router = express.Router();
const userService = require("../service/userService.js");

router.post("/register", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const newUser = await userService.createUser(email, password, role);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;