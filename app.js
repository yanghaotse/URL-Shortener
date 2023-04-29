const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const {shortUrlGenerator, myHttp, http} = require("./shortUrlGenerator") //shortUrlGenerator function
const URLshortener = require('./models/urlShortener') //mongodb資料
const routes = require('./routes')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout : "main", extname : ".hbs"}))
app.set('view engine','hbs')
app.use(express.urlencoded({ extended : true})) //body-parser
app.use(express.static('public')) //使用css
app.use(routes) //使用路由

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

app.listen( port, () => {
  console.log(`App is running on http://localhost:${port}` )
})






