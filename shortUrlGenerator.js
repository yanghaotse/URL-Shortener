const http = 'http://4ritalin2.her0kuapp.com/'

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

function shortUrlGenerator(){
  let randomShort = ''
  for(let i = 0; i < 4; i++ ){
    randomShort += randomCharacter()
  }
  randomShort += randomNumber()
  const shortUrl = `${http}${randomGenerator(randomShort)}`
  return shortUrl
}

function generateNewShortUrl() {
  return shortUrlGenerator()
}


module.exports = generateNewShortUrl