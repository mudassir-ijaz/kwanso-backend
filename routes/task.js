const express = require("express")
const auth = require("../middlewares/auth")
const {
  createTask,
  listTasks,
  deleteTaskInBulk,
} = require("../controllers/tasks")

const router = express.Router()
router.post("/create-task", auth, createTask)
router.get("/list-task/:id", auth, listTasks)
router.put("/delete-task-in-bulk", auth, deleteTaskInBulk)

module.exports = router
