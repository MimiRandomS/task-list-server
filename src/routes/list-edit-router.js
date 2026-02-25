//list-edit-router.js
const express = require("express");
const taskService = require("../service/taskService");
const Task = require("../model/modelTask");
const router = express.Router();

function validateTaskMiddleware(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Empty body" });
  }

  try {
    Task.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

router.post("/", validateTaskMiddleware, (req, res) => {
  const newTask = new Task(
    req.body.id,
    req.body.isCompleted,
    req.body.description
  );

  const created = taskService.createTask(newTask);
  res.status(201).json(created);
});

router.put("/:id", validateTaskMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const updatedTask = new Task(
    id,
    req.body.isCompleted,
    req.body.description
  );

  const updated = taskService.updateTask(id, updatedTask);

  if (!updated) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  taskService.deleteTask(id);
  res.status(204).send();
});


module.exports = router;
