const { writeFile, readFile } = require('fs').promises;
const FILE_NAME = './temporary/output.txt';

const writer = async () => {
  await writeFile(FILE_NAME, "01 First line.\n");
  await writeFile(FILE_NAME, "02 Second line.\n", {flag: 'a'});
  await writeFile(FILE_NAME, "03 Third line.\n", {flag: 'a'});
}

const reader = async () => {
  const fileContent = await readFile(FILE_NAME, 'utf8')
  console.log(fileContent)
}

const readWrite = async () => {
  await writer();
  await reader();
}

readWrite()