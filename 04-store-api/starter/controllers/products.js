const Product = require('../models/product')
const queryValidator = require('../utils/queryValidator')

const DEFAULT_LIMIT = 10;
const START_PAGE = 1;

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find(req.query)
  res.status(200).json({
    length: products.length,
    ...req.query,
    products
  })
}
const getAllProducts = async (req, res) => {
  const {
    name,
    featured,
    company,
    sort,
    fields,
    numericFilters,
  } = req.query
  let {
    limit = DEFAULT_LIMIT,
    page  = START_PAGE
  } = req.query
  const queryObject = {}

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (featured) {
    const isFeatured = featured.toLowerCase()
    queryObject.featured = (isFeatured === 'true')
  }
  if (company) {
    queryObject.company = company
  }
  if (numericFilters) {
    const operatorsMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '=': '$eq',
    }
    const searchOperator = /([<>=]+)/g
    let filters = numericFilters.replace(searchOperator, match => `-${operatorsMap[match]}-`)
    console.log(filters)
    const options = ['price', 'rating']
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: Number(value)
        }
      }
    })
    
  }

  // Create base query
  const result = Product.find( queryObject )
  
  // Sort
  if (sort) {
    const formattedSort = sort.replace(',', ' ')
    result.sort( formattedSort )
  } else {
    // Set default sort by createdAt
    result.sort('createdAt')
  }

  // Select fields
  if (fields) {
    const formattedFields = fields.replace(',', ' ')
    result.select( formattedFields )
  }

  // Pagination
  limit = queryValidator.toNumber(limit, DEFAULT_LIMIT)
  page = queryValidator.toNumber(page, START_PAGE)
  result.limit( limit ).skip( (page - 1) * limit )
  
  // Run created query
  const products = await result

  res.status(200).json({
    length: products.length,
    ...queryObject,
    ...{ sort, fields, limit, page },
    products
  })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}