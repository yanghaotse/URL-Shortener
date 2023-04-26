const mongoose = require("mongoose")
const URLshortener = require("../urlShortener")
const shortUrl = require('../../shortUrlGenerator')


if (process.env.NODE_URI !== "production"){
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,  useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', () => {
  console.log("MongoDB error!")
})
db.once('open', async() => {
  console.log('MongDB connected!')
  try{
    await URLshortener.create({
      originalUrl: "https://www.youtube.com/",
      shortUrl: shortUrl()
    })
    console.log("urlShortenerSeeder done .")
  }catch(error){
    console.log(error)
  }finally{
    db.close()
  }
})