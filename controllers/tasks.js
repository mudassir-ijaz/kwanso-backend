const asyncHandler = require("../middlewares/async")
const { Task } = require("../models/Task")
const _ = require("lodash")

exports.createTask = asyncHandler(async (req, res) => {
  let task = new Task(_.pick(req.body, ["name", "user_id"]))
  await task.save()
  var object = {}
  object.id = task._id
  object.name = task.name

  res.status(200).json({
    task: object,
  })
})

exports.listTasks = asyncHandler(async (req, res) => {
  const task = await Task.find({ user_id: req.params.id, active: true })
  res.status(200).json({
    tasks: task,
  })
})

exports.deleteTaskInBulk = asyncHandler(async (req, res) => {
  const { task_ids } = req.body
  for (let i = 0; i < task_ids.length; i++) {
    await Task.findOneAndUpdate(
      { _id: task_ids[i] },
      {
        $set: {
          active: false,
        },
      },
      { new: true },
    )
  }

  const task = await Task.find({ active: true })
  res.status(200).json({
    tasks: task,
  })
})
