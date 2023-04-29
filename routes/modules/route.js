const express = require('express')
const router = express.Router()
const URLshortener = require('../../models/urlShortener') //資料庫
const {shortUrlGenerator, myHttp, http} = require('../../shortUrlGenerator') //短網址產生器


// route: POST產生短網址 -> findOne() *新增:判斷使用者輸入的網址是否為已經產生過的短網址
router.post(`/shorten`,async(req, res) => {
  const originalUrl = req.body.originalUrl
  const newUrl = shortUrlGenerator();
  // 判斷input是否為空
  if(!originalUrl || originalUrl === ''){
    res.redirect('/')
  }
  // 判斷輸入網址是否已存在:
  //輸入相同網址時，產生一樣的縮址。 
  const existUrl = await URLshortener.findOne({ originalUrl : originalUrl }).lean()
  if(existUrl){
    res.render('new',{ newUrl : existUrl.shortUrl})
    return
  // 判斷input網址是否為已產生過的短網址
  }else if(await URLshortener.exists({ shortUrl : originalUrl })){
    res.render('error',{ message : 'The URL has already been used'})
  }else{
    URLshortener.create({
      originalUrl: originalUrl,
      shortUrl: newUrl
    })
    .then(() => res.render('new',{ newUrl : newUrl }))
  }
})

// route: shortUrl
router.get(`/:randomCode`,(req, res) => { 
  const randomCode = req.params.randomCode
  const shortUrl = `${http}/${myHttp}/${randomCode}`
  // console.log(randomCode)
  URLshortener.findOne({ shortUrl : shortUrl })
    .lean()
    .then(urlData => {
      if(urlData){
        res.redirect(`${urlData.originalUrl}`) //重新導向到對應的原網址
      }else{ //若輸入的短網址有誤
        res.status(404).render("error", { message : 'The shortURL does not exist.'})
      }
    })
    .catch(error => console.log(error))
})

module.exports = router


// route: POST產生短網址 -> findOne()
// app.post('/newUrl', (req, res) => {
//   const originalUrl = req.body.originalUrl
//   const newUrl = shortUrlGenerator()
//   if(!originalUrl){
//     res.redirect('/')
//   }
//   URLshortener.findOne({ originalUrl : originalUrl})
//     .lean()
//     .then(urlData => {
//       // 輸入相同網址時，產生一樣的縮址。
//       if (urlData){
//         res.render('new', {newUrl: urlData.shortUrl})
//       }else{
//         URLshortener.create({
//           originalUrl: originalUrl,
//           shortUrl: newUrl
//         })
//         .then(() => res.render('new', {newUrl}))
//       }
//     })
//     .catch(error => console.log(error))
// })

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
