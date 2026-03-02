// taskService.js
const Task = require("../Schema/taskSchema");

async function getAllTasks() {
  return await Task.find();
}

async function getTaskById(id) {
  return await Task.findById(id);
}

async function createTask(taskData) {
  const task = new Task(taskData);
  return await task.save();
}

async function updateTask(id, updatedData) {
  return await Task.findByIdAndUpdate(id, updatedData, { new: true });
}

async function deleteTask(id) {
  return await Task.findByIdAndDelete(id);
}

async function getAllTasksByStatus(status) {
  return await Task.find({ isCompleted: status });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getAllTasksByStatus
};
