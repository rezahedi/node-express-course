const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter something below.";
const RANDOM_NUMBER = Math.floor(Math.random() * 100);
const GUESS_LIMIT = 10;
let guesses = 0;
let result = "";

const guessChecker = (guessedNumber) => {
  console.log("guesschecker run")
  guesses++;

  if (guessedNumber === RANDOM_NUMBER) {
    return `You found it with ${guesses} guesses! 🎉🎉🎉`;
  } else if (guessedNumber < RANDOM_NUMBER) {
    return `You are too low. Guess again!`;
  } else {
    return `You are too high. Guess again!`;
  }
};

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <form method="POST">
  <h2>Number Guessing Game</h2>
  <h4>${guesses}/${GUESS_LIMIT} guesses</h4>
  <p>You have ten guesses to find the number I'm thinking of.</p>
  <p>By entering a number between 1 and 100, you can guess what number I'm thinking of.</p>
  <p>I'm giving you clue by telling you if you're is lower or higher than mine.</p>
  Your number: <input name="guessed_number" type="number" min="1" max="100" style="padding:5px;text-align:center" />
  <button type="submit" style="padding:5px">Guess</button>
  </form>
  ${result}
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["guessed_number"]) {
        item = body["guessed_number"];
        result = guessChecker( parseInt(item) )
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
