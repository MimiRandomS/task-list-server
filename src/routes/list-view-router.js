// list-view-router.js
const express = require("express");
const taskService = require("../service/taskService");
const router = express.Router();

function validateParams(req, res, next) {
  const { id } = req.params;
  const { status } = req.query;

  if (id !== undefined && isNaN(Number(id))) {
    return res.status(400).json({ error: "invalid id" });
  }
  if (
    status !== undefined &&
    status !== "true" &&
    status !== "false"
  ) {
    return res.status(400).json({ error: "invalid status (use true or false)" });
  }

  next();
}

router.get("/", validateParams, (req, res) => {
  const { status } = req.query;
  let tasks = taskService.getAllTasks();

  if (status !== undefined) {
    const statusBoolean = status === "true";
    tasks = tasks.filter(task => task.isCompleted === statusBoolean);
  }

  res.json(tasks);
});

router.get("/:id", validateParams, (req, res) => {
  const id = Number(req.params.id);
  const task = taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

module.exports = router;