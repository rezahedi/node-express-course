const express = require('express');
const app = express();


/**
 * Create HTTP server
 */
const http = require('http')
const port = 3000;
app.set('port', port)
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})


app.use(express.static("./public"))

app.get('/api/xendpoint', (request, response) => {
    return response.json({
        message: 'My First API Endpoint!'
    })
})
