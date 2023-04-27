const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const {shortUrlGenerator, myHttp, http} = require("./shortUrlGenerator") //shortUrlGenerator function
const URLshortener = require('./models/urlShortener') //mongodb資料

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout : "main", extname : ".hbs"}))
app.set('view engine','hbs')
app.use(express.urlencoded({ extended : true})) //body-parser
app.use(express.static('public'))//

if(process.env.NODE_URI !== "production"){
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true,  useUnifiedTopology: true })

const db = mongoose.connection 
db.on('error', () => {
  console.log("mongoDB error!")
})
db.once('open', async() => {
  console.log("mongoDB connect!")
})


app.get('/', (req, res) => {
  res.render('index')
})

// route: POST產生短網址 -> findOne()
app.post('/newUrl', (req, res) => {
  const originalUrl = req.body.originalUrl
  const newUrl = shortUrlGenerator()
  if(!originalUrl){
    res.redirect('/')
  }
  URLshortener.findOne({ originalUrl : originalUrl})
    .lean()
    .then(urlData => {
      // 輸入相同網址時，產生一樣的縮址。
      if (urlData){
        res.render('new', {newUrl: urlData.shortUrl})
      }else{
        URLshortener.create({
          originalUrl: originalUrl,
          shortUrl: newUrl
        })
        .then(() => res.render('new', {newUrl}))
      }
    })
    .catch(error => console.log(error))
})

// route: POST產生短網址 -> find()
// app.post('/newURL', (req,res) => {
//   const originalUrl = req.body.originalUrl
//   const newUrl = shortUrlGenerator()
//   if(!originalUrl){
//     res.redirect('/')
//   }
//   // console.log(originalUrl)
//   URLshortener.find()
//     .lean()
//     .then( urlData => {
//       const sameUrl = urlData.find( (data) => data.originalUrl === originalUrl)
//       if(sameUrl){
//         return res.render('new',{ newUrl: sameUrl.shortUrl})
//       }else{
//         return URLshortener.create({
//             originalUrl: originalUrl,
//             shortUrl: newUrl
//           })
//           .then(() => res.render('new',{newUrl}))
//         }
//       })
//     .catch(error => console.log(error))
// })


app.get(`/${myHttp}:randomCode`,(req, res) => { 
  const randomCode = req.params.randomCode
  const shortUrl = `${http}${myHttp}${randomCode}`
  // console.log(randomCode)
  URLshortener.findOne({ shortUrl : shortUrl })
    .lean()
    .then(urlData => {
      if(urlData){
        res.redirect(`${urlData.originalUrl}`)
      }else{
        res.status(404).render("error")
      }
    })
    .catch(error => console.log(error))
})

app.listen( port, () => {
  console.log(`app is running on http://localhost:${port}` )
})
