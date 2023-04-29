
const URLshortener = require("../urlShortener") //資料庫
const shortUrlGenerator = require('../../shortUrlGenerator').shortUrlGenerator //短網址產生器
const db = require('../../config/mongoose') //mongodb連線設定

db.once('open', async() => {
  console.log('MongDB connected!')
  // 寫入一筆資料測試是否成功(以bootstrap首頁測試)
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