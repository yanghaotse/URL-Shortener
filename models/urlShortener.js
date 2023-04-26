const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  originalUrl: {
    type: String,
    require: true
  },
  shortUrl:{
    type: String,
    require: true
  }
})






module.exports = mongoose.model("URLshortener",urlSchema)