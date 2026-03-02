// list-view-router.js
const express = require("express");
const taskService = require("../service/taskService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { status } = req.query;

    let tasks;

    if (status !== undefined) {
      if (status !== "true" && status !== "false") {
        return res
          .status(400)
          .json({ error: "invalid status (use true or false)" });
      }

      tasks = await taskService.getAllTasksByStatus(
        status === "true"
      );
    } else {
      tasks = await taskService.getAllTasks();
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Invalid id format" });
  }
});

module.exports = router;