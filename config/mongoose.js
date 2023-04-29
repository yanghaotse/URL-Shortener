const mongoose = require('mongoose')
if(process.env.NODE_URI !== "production"){
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true,  useUnifiedTopology: true })

const db = mongoose.connection 
db.on('error', () => {
  console.log("MongoDB error!")
})
db.once('open', async() => {
  console.log("MongoDB connect!")
})

module.exports = db