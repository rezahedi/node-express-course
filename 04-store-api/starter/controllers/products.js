const Product = require('../models/product')
const DEFAULT_LIMIT = 10;

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find(req.query)
  res.status(200).json({
    length: products.length,
    ...req.query,
    products
  })
}
const getAllProducts = async (req, res) => {
  const { name, featured, company, sort, fields } = req.query
  let { limit = DEFAULT_LIMIT, page = 1 } = req.query
  const queryObject = {}

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (featured) {
    queryObject.featured = (featured === 'true' ? true : false)
  }
  if (company) {
    queryObject.company = company
  }

  // Create base query
  const result = Product.find( queryObject )
  
  // Sort
  if (sort) {
    result.sort( sort.replace(',', ' ') )
  } else {
    // Set default sort by createdAt
    result.sort('createdAt')
  }

  // Select fields
  if (fields) {
    result.select( fields.replace(',', ' ') )
  }

  // Limit
  limit = Math.abs( parseInt(limit) ) || DEFAULT_LIMIT
  result.limit( limit )

  // Pagination
  page = Math.abs( parseInt(page) ) || 1
  result.skip( (page - 1) * limit )
  
  // Run created query
  const products = await result

  res.status(200).json({
    length: products.length,
    ...queryObject,
    ...{ sort },
    ...{ fields },
    ...{ limit },
    ...{ page },
    products
  })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}