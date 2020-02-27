const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  due_at: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  toBeReminded: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "user"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
