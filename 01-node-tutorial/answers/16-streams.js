const fs = require("fs");

const FILE_NAME = "../content/big.txt";
const HIGH_WATER_MARK = 100;

const myStream = fs.createReadStream(FILE_NAME, { highWaterMark: HIGH_WATER_MARK, encoding: "utf8" });

let counter = 0;
myStream.on('data', (chunk) => {
  if(counter === 0) {
    console.log(new Date().getMilliseconds(), `First chunk of data with highWaterMark of ${HIGH_WATER_MARK}`);
  }
  counter++;
});

myStream.on('end', () => {
  console.log(new Date().getMilliseconds(), `End of stream, read ${counter} chunks of data with highWaterMark of ${HIGH_WATER_MARK}`);
});

myStream.on('error', (err) => {
  console.log("Error: ", err);
});