const { readFileSync, writeFileSync } = require('fs');

writeFileSync('./temporary/first.txt', "I'm the first paragraph.\n")
writeFileSync('./temporary/first.txt', "And I'm the second paragraph.\n", {flag: 'a'})
writeFileSync('./temporary/first.txt', "Finally I'm the last paragraph.\n", {flag: 'a'})

const fileContent = readFileSync('./temporary/first.txt', 'utf8')
console.log(fileContent)