const http = 'http://localhost:3000/'
const myHttp = 'ritalin.com/'

const characterCollection = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const numberCollection = "1234567890".split('')
// console.log(characterCollection,numberCollection)




function randomCharacter(){
  const randomCharacter = Math.floor(Math.random()*characterCollection.length)
  return characterCollection[randomCharacter]
}

function randomNumber(){
  const randomNumber = Math.floor(Math.random()*numberCollection.length)
  return numberCollection[randomNumber]
}

function randomGenerator(random){
  let randomArray = random.split('')
  for (let i = randomArray.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1))
    ;[ randomArray[i], randomArray[j] ] = [ randomArray[j], randomArray[i] ]
  }
  return randomArray.join('') //回傳五碼字串
    
}

function basicShortUrlGenerator(){
  let randomShort = ''
  for(let i = 0; i < 4; i++ ){
    randomShort += randomCharacter()
  }
  randomShort += randomNumber()
  const shortUrl = `${http}${myHttp}${randomGenerator(randomShort)}`
  return shortUrl
}

function shortUrlGenerator() {
  return basicShortUrlGenerator()
}

// module.exports = {
//   shortUrlGenerate: shortUrlGenerate,
//   myHttp: myHttp
// };
module.exports = { shortUrlGenerator, myHttp, http}

