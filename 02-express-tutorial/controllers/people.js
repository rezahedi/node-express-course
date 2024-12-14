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

const removePerson = (id) => {
  const person = getPerson(id)
  if( !person ) {
    return false
  }
  
  // splice(start, deleteCount, item1, item2, /* …, */ itemN)
  people.splice( people.indexOf(person), 1 )
  return true
}

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  removePerson
}