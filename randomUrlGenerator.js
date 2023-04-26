const http = 'http://your-project-name.herokuapp.com/'

const characterCollection = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const numberCollection = "1234567890".split('')
// console.log(characterCollection,numberCollection)
let randomShort = ''
for(let i = 0; i < 4; i++ ){
  randomShort += randomCharacter()
}
randomShort += randomNumber()
const newUrl = `${http}${randomGenerator(randomShort)}`

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
  return randomArray.join('')
    
}

module.exports = newUrl