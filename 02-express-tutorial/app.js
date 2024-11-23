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

app.use(express.static("./public"))

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
    const limit = parseInt(request.query.limit) || defaultLimit
    const minPrice = parseFloat(request.query.minPrice) || -1
    const maxPrice = parseFloat(request.query.maxPrice) || -1

    // Handle error: Always minPrice < maxPrice
    if( minPrice!==-1 && maxPrice!==-1 && minPrice>maxPrice ) {
        response.status(400).json({
            message: "Minimum and maximum price conflict!"
        })
    }
    
    const resultProducts = products.filter(
        (p) => {
            let result = false;

            if( search !== "" )
                result = (p.name.toLowerCase().indexOf(search) >= 0)
            if( minPrice !== -1 ) {
                // TODO: if search term available, consider the result of the prev if statement
                if(search) {
                    result = result && (p.price >= minPrice)
                } else {
                    result = (p.price >= minPrice)
                }
            }
            if( maxPrice !== -1 ) {
                // TODO: if search or minPrice available, consider the result of prev if statements
                if(search || minPrice !== -1 ) {
                    result = result && (p.price <= maxPrice)
                } else {
                    result = (p.price <= maxPrice)
                }
            }
            return result;
        }
    )

    response.json({
        term: search,
        limit,
        minPrice,
        maxPrice,
        result: resultProducts.slice( 0, limit ),
    })
})

// Not found for all other paths
app.all( '*', (request, response) => {
    response.status(404).json({
        message: 'Path not found!'
    })
})



app.listen(port, () => {
    console.log(`Local sercer is listening on port ${port}`)
})
