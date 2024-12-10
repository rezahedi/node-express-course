const names = require('./04-names.js')
const greeting = require('./05-utils.js')
const {items, singlePerson} = require('./06-alternative-flavor.js')
require('./07-mind-grenade.js')

greeting(names.firstPerson)
greeting(names.secondPerson)
greeting(names.thirdPerson)

console.log(items, singlePerson)