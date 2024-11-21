const express = require('express');
const app = express();
const { products } = require("./data")


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
    response.json({
        message: 'My test API endpoint!'
    })
})

app.get('/api/v1/products', (request, response) => {
    response.json(products)
})

app.all( '*', (request, response) => {
    response.status(404).json({
        message: 'Path not found!'
    })
})