//list-edit-router.js
const express = require("express");
const taskService = require("../service/taskService");
const Task = require("../model/modelTask");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const newTask = new Task(
      req.body.id,
      req.body.isCompleted,
      req.body.description,
    );

    Task.validate(req.body);

    const created = taskService.createTask(newTask);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  taskService.deleteTask(id);
  res.status(204).send();
});

router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }
    const updatedTask = new Task(
      id,
      req.body.isCompleted,
      req.body.description,
    );

    Task.validate(req.body);

    const updated = taskService.updateTask(id, updatedTask);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
