// Note: This could be moved to a separate folder as /services
// to act as a bridge between database and controllers

const { people } = require("../data");

// TODO: Add optional offset and limit params with default value to getAll
const getAll = () => {
  return people
}
const getById = (id) => {
  return people.find( p => p.id === id )
}

const create = (name) => {
  const person = {
    id: people.length + 1,
    name
  }
  people.push( person )
  return person
}

const update = (id, name) => {
  const person = getById(id)
  if( !person ) {
    return false
  }
  person.name = name
  return person
}

const remove = (id) => {
  const person = getById(id)
  if( !person ) {
    return false
  }

  // splice(start, deleteCount, item1, item2, /* …, */ itemN)
  people.splice( people.indexOf(person), 1 )
  return true
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}