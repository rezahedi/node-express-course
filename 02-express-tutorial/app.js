const express = require('express');
const app = express();


/**
 * Create HTTP server
 */
// const http = require('http')
const port = 3000;
// app.set('port', port)
// const server = http.createServer(app)
// server.listen(port, () => {
//     console.log(`app listening at http://localhost:${port}`)
// })

app.listen(port, () => {
    console.log(`Local sercer is listening on port ${port}`)
})

app.use(express.static("./public"))

app.get('/api/v1/test', (request, response) => {
    return response.json({
        message: 'My test API endpoint!'
    })
})