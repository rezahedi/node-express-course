const { writeFile } = require('fs');
const FILE_NAME = './temporary/output.txt';

console.log("at start");

// First line
writeFile(FILE_NAME, "This is line 1\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    console.log("Write successfully");

    // Second line
    writeFile(FILE_NAME, "This is line 2\n", {flag: 'a'}, (err, result) => {
      console.log("at point 2");
      if (err) {
        console.log("This error happened: ", err);
      } else {
        console.log("Write successfully");

        // Third line
        writeFile(FILE_NAME, "This is line 3\n", {flag: 'a'}, (err, result) => {
          console.log("at point 3");
          if (err) {
            console.log("This error happened: ", err);
          } else {
            console.log("Write successfully");

            console.log("at end");          }
        });
      }
    });
  }
});
