const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  if (!process.env.AUTH_REQUIRE) return next()

  const token = req.header("Authorization")
  if (!token)
    return res.status(401).json({
      message: "Access denied, no token provided. Please provide auth token.",
    })

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY)
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).json({ error: "Invalid token." })
  }
}
