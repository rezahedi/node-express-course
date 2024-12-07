const { writeFile, readFile } = require('fs').promises;
const FILE_NAME = './temporary/output.txt';

writeFile(FILE_NAME, "01 First line.\n")
  .then(() => {
    writeFile(FILE_NAME, "02 Second line.\n", {flag: 'a'})
  })
  .then(() => {
    writeFile(FILE_NAME, "03 Third line.\n", {flag: 'a'})
  })
  .catch((error) => {
    console.error("An error occurred: ", error)
  })