// mpdelTask.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  isCompleted: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
