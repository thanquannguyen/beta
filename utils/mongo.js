const mongoose = require('mongoose')
module.exports = async () => {
  await mongoose.connect(process.env.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
  
}
