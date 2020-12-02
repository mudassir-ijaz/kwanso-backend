const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

// user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
})

// token generation
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWTKEY,
    { expiresIn: 86400 },
  )
  return token
}

// User model
const User = mongoose.model("User", userSchema)

exports.User = User
