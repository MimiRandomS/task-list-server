// taskService.js
const { db } = require("../database/db");

function getAllTasks() {
  return Array.from(db.values());
}

function getTaskById(id) {
  return db.get(id);
}

function createTask(task) {
  db.set(task.id, task);
  return task;
}

function deleteTask(id) {
  db.delete(id);
}

function updateTask(id, updatedTask) {
  if (!db.has(id)) {
    return null;
  }

  db.set(id, updatedTask);
  return updatedTask;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
};
