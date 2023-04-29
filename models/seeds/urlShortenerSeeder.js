
const URLshortener = require("../urlShortener")
const shortUrlGenerator = require('../../shortUrlGenerator').shortUrlGenerator
const db = require('../../config/mongoose')

db.once('open', async() => {
  console.log('MongDB connected!')
  // 寫入一筆資料測試是否成功
  try{
    await URLshortener.create({
      originalUrl: "https://getbootstrap.com/",
      shortUrl: shortUrlGenerator()
    })
    console.log("urlShortenerSeeder done .")
  }catch(error){
    console.log(error)
  }finally{
    db.close()
  }
})