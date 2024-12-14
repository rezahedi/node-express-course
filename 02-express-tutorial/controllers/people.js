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

module.exports = {
  addPerson,
  getPeople
}