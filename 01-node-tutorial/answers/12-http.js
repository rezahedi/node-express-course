const http = require('http');
const PORT = 5000;

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.end('Hello world!');
  } else {
    res.end('Page not found.')
  }
})

server.listen(PORT)
console.log(`Server running on port ${PORT}`)