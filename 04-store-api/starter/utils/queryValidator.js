const toNumber = (value, defaultValue) => {
  return Math.abs( Number(value) ) || defaultValue
}

module.exports = {
  toNumber,
}