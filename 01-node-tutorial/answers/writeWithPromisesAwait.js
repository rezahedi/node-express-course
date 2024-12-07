const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
  const fileName = './temporary/temp.txt';

  await writeFile(fileName, "01 First line.\n");
  await writeFile(fileName, "02 Second line.\n", {flag: 'a'});
  await writeFile(fileName, "03 Third line.\n", {flag: 'a'});
}

const reader = async () => {
  const fileName = './temporary/temp.txt';
  
  const fileContent = await readFile(fileName, 'utf8')
  console.log(fileContent)
}

const readWrite = async () => {
  await writer();
  await reader();
}

readWrite()