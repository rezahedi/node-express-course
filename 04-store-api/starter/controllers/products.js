const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find(req.query)
  res.status(200).json({
    length: products.length,
    ...req.query,
    products
  })
}
const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.status(200).json({
    length: products.length,
    products
  })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}