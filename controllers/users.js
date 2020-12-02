const asyncHandler = require("../middlewares/async")
const { User } = require("../models/User")
const _ = require("lodash")
const bcrypt = require("bcryptjs")

exports.register = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if (user)
    return res.status(401).json({
      message: `User with email ${req.body.email} is already registered`,
    })
  user = new User(_.pick(req.body, ["email", "password"]))
  let salt = await bcrypt.genSalt(12)
  user.password = await bcrypt.hash(user.password, salt)
  await user.save()
  const object = {}
  object.id = user._id
  object.email = user.email

  res.status(200).json({
    user: object,
  })
})

exports.login = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).json({ message: "Invalid email or password." })
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password." })
  const token = user.generateAuthToken()
  res.json({ jwt: token })
})

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password")
  if (user) {
    res.json({ user: user })
  } else {
    res.status(404).json({ message: "Not Found!" })
  }
})
