// list-view-router.js
const express = require("express");
const taskService = require("../service/taskService");
const router = express.Router();

router.get("/", (req, res) => {
  const { status } = req.query;
  let tasks = taskService.getAllTasks();

  if (status !== undefined) {
    const statusBoolean = status === "true";
    tasks = tasks.filter((task) => task.isCompleted === statusBoolean);
  }

  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

module.exports = router;
