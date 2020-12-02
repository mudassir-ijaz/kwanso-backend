const connectDB = require("./config/databases")
connectDB()
const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")

const app = express()
dotenv.config({ path: "./config/config.env" })
const bodyparser = require("body-parser")

app.use(cors({ origin: "*" }))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

const user = require("./routes/user")
const task = require("./routes/task")

app.use("/api/auth", user)
app.use("/api/task", task)

const port = process.env.PORT || 3800
const server = app.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = server
