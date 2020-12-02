const mongoose = require("mongoose")

// task schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  active: {
    type: Boolean,
    default: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

// Task model
const Task = mongoose.model("Task", taskSchema)

exports.Task = Task
