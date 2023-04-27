const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const {shortUrlGenerator, myHttp} = require("./shortUrlGenerator") //shortUrlGenerator function
const URLshortener = require('./models/urlShortener') //資料

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout : "main", extname : ".hbs"}))
app.set('view engine','hbs')
app.use(express.urlencoded({ extended : true})) //body-parser

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
  console.log(myHttp)
  res.render('index')
})

app.post('/newUrl', (req, res) => {
  const originalUrl = req.body.originalUrl
  const newUrl = shortUrlGenerator()
  if(!originalUrl){
    res.redirect('/')
  }
  URLshortener.findOne({ originalUrl : originalUrl})
    .lean()
    .then(urlData => {
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


// 
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


// app.get('/4ritalin2pr0jectA11.com/:randomUrl',(req, res) => {
//   const randomUrl = req.params.randomUrl
//   const sameUrl = URLshortener.find( urlData => {

//   })
// })

app.listen( port, () => {
  console.log(`app is running on http://localhost:${port}` )
})

    // .then(() => {
    //   const newUrl = URLshortener.find(data => {
    //     data.originalUrl.toLowerCase().trim().includes(originalUrl.toLowerCase().trim())
    //     return 
    //   })
    // })