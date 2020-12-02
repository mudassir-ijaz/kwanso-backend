const mongoose = require("mongoose")
// later from process.env.MongoURL
const connectDB = async () => {
  await mongoose.connect(
    "mongodb://kwanso:kwanso123456@ds035358.mlab.com:35358/kwanso",
    {
      retryWrites: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  )

  console.log(`MongoDB is connected to URL ${process.env.MongoURL}`)
}

module.exports = connectDB
