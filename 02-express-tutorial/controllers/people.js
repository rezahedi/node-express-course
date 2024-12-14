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

module.exports = {
  addPerson,
  getPeople,
  getPerson
}