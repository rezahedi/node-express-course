const express = require('express');
const app = express();
const { products } = require("./data")
const peopleRouter = require("./routes/people")

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

app.use(express.static("./methods-public"))

const logger = (request, response, next) => {
    console.log(new Date().toTimeString(), request.method, request.url)
    next()
}

app.use(logger)

app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

// First test endpoint
app.get('/api/v1/test', (request, response) => {
    response.json({
        message: 'My test API endpoint!'
    })
})

// Get all products
app.get('/api/v1/products', (request, response) => {
    response.json(products)
})

// Get product by Id
app.get('/api/v1/products/:productId', (request, response) => {
    
    const productId = parseInt(request.params.productId)
    const product = products.find( p => p.id === productId )
    
    if( !product ) {
        response.status(400).json({
            message: 'Product not found!'
        })
    }

    response.json(product)
})

// Search product query
app.get('/api/v1/query', (request, response) => {
    const defaultLimit = 5;

    const search = request.query.search && request.query.search.toLocaleLowerCase() || ""
    const limit = Math.abs( parseInt(request.query.limit) ) || defaultLimit
    const minPrice = parseFloat(request.query.minPrice) || -1
    const maxPrice = parseFloat(request.query.maxPrice) || -1

    // Handle error: Always minPrice < maxPrice
    if( minPrice!==-1 && maxPrice!==-1 && minPrice>maxPrice ) {
        response.status(400).json({
            message: "Minimum and maximum price conflict!"
        })
    }
    
    let resultProducts = []

    // If there is any filters set resultProducts with all products
    if( search !== "" || minPrice !== -1 || maxPrice !== -1 ) {
        resultProducts = [...products]
    }

    // Filter by search term
    if( search !== "" ) {
        resultProducts = resultProducts.filter(
            (p) => p.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    // Filter by minPrice
    if( minPrice !== -1 ) {
        resultProducts = resultProducts.filter(
            (p) => p.price >= minPrice
        )
    }

    // Filter by maxPrice
    if( maxPrice !== -1 ) {
        resultProducts = resultProducts.filter(
            (p) => p.price <= maxPrice
        )
    }

    response.json({
        ...(search!=="" && {term: search} ),
        limit,
        ...(minPrice !== -1 && { minPrice }),
        ...(maxPrice !== -1 && { maxPrice }),
        result: resultProducts.slice( 0, limit ),
    })
})

app.use("/api/v1/people", peopleRouter)

// Not found for all other paths
app.all( '*', (request, response) => {
    response.status(404).json({
        message: 'Path not found!'
    })
})



app.listen(port, () => {
    console.log(`Local server is listening on port ${port}`)
})
