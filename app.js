const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const shortUrl = require("./shortUrlGenerator") //shortUrlGenerator function
const URLshortener = require('./models/urlShortener')

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
  res.render('index')
})

app.get('/newURL', (req,res) => {
  const originalUrl = req.query.originalUrl
  const shortUrl = shortUrl()
  return URLshortener.create({
    originalUrl: originalUrl,
    shortUrl: shortUrl
  })
    .then( () => res.render('new',{shortUrl}))
    .catch(error => console.log(error))
})

app.listen( port, () => {
  console.log(`app is running on http://localhost:${port}` )
})

