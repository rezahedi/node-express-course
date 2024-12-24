const getAllProductsStatic = async (req, res) => {
  res.status(200).json({msg: 'products testing route statis'})
}
const getAllProducts = async (req, res) => {
  res.status(200).json({msg: 'products testing route'})
}

module.exports = {
  getAllProductsStatic,
  getAllProducts,
}