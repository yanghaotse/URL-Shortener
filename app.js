const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout : "main", extname : ".hbs"}))
app.set('view engine','hbs')
app.use(express.urlencoded({ extended : true})) //body-parser
mongoose.connect(process.env.MONGODB_URI)


app.get('/', (req, res) => {
  res.render('index')
})

app.listen( port, () => {
  console.log(`app is running on http://localhost:${port}` )
})
