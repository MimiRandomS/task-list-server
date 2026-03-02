//list-edit-router.js
const express = require("express");
const taskService = require("../service/taskService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const created = await taskService.createTask(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await taskService.updateTask(
      req.params.id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
