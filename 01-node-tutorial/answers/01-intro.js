console.log('+++ Hello World +++');
console.log("Current Directory:", __dirname);
console.log("File Name:", __filename);

setInterval(() => {
  console.log( new Date().toTimeString() + " Ctrl+C to exit" )
}, 500)