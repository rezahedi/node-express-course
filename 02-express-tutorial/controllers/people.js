const db = require("./services");

const addPerson = (request, response) => {
  const name = request.body.name
    
  // Handle error: Name is required
  if( !name ) {
    return response.status(400).json({
      message: 'Please provide a name'
    })
  }

  // Add new person to people array
  const person = db.create(name)

  response.status(201).json({
    success: true,
    person
  })
}

const getPeople = (request, response) => {
  const people = db.getAll()
  response.json( people )
}

const getPerson = (request, response) => {
  const id = parseInt(request.params.id)

  const person = db.getById(id)

  // Handle error: Person not found
  if( !person ) {
    return response.status(404).json({
      success: false,
      message: 'Person not found!'
    })
  }

  response.json(person)
}

// Return false if person not found, otherwise return updated person object
const updatePerson = (request, response) => {
  const id = parseInt( request.body.id )
  const name = request.body.name

  // Handle error: Name and id are required
  if( !name || !id ) {
    return response.status(404).json({
      message: 'Please provide an id and name'
    })
  }

  const person = db.update(id, name)

  if( !person ) {
    return response.status(404).json({
      message: 'Person not found!'
    })
  }

  response.json({
    success: true,
    message: 'Person updated!',
    person
  })
}

const removePerson = (request, response) => {
  const id = parseInt(request.params.id)

  const result = db.remove(id)

  // Handle error: Person not found
  if( !result ) {
    return response.status(404).json({
      message: 'Person not found!'
    })
  }

  response.json({
    success: true,
    message: 'Person removed!'
  })
}

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  removePerson
}