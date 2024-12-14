const { people } = require("../data");

const addPerson = (name) => {
  const person = {
    id: people.length + 1,
    name
  }

  people.push( person )

  return person
}

const getPeople = () => {
  return people
}

const getPerson = (id) => {
  return people.find( p => p.id === id )
}

// Return false if person not found, otherwise return updated person object
const updatePerson = (id, name) => {
  const person = getPerson(id)
  if( !person ) {
    return false
  }

  person.name = name
  return person
}

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson
}