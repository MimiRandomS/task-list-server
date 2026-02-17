// mpdelTask.js
class task {
  constructor(id, status, description) {
    this.id = id;
    this.isCompleted = status;
    this.description = description;
  }

  static validate(task) {
    if (typeof task.id !== "number") {
      throw new Error("Invalid id");
    }

    if (typeof task.isCompleted !== "boolean") {
      throw new Error("Invalid status");
    }

    if (typeof task.description !== "string") {
      throw new Error("Invalid description");
    }
  }
}

module.exports = task;
