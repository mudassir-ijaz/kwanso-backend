const express = require("express")
const auth = require("../middlewares/auth")
const { register, login, me } = require("../controllers/users")

const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/me/:id", auth, me)

module.exports = router
