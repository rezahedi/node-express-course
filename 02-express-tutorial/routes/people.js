const express = require("express");
const router = express.Router();
const { addPerson, getPeople, getPerson, updatePerson, removePerson } = require("../controllers/people");

router.get("/", (request, response) => {
  const people = getPeople()
  response.json(people)
})

router.post("/", (request, response) => {
  const name = request.body.name
    
  // Handle error: Name is required
  if( !name ) {
    response.status(400).json({
      message: 'Please provide a name'
    })
  }

  // Add new person
  const person = addPerson(name)

  response.status(201).json({
    success: true,
    person
  })
})

// Get person by id
router.get("/:id", (request, response) => {
  const id = parseInt(request.params.id)

  const person = getPerson(id)

  // Handle error: Person not found
  if( !person ) {
    response.status(404).json({
      success: false,
      message: 'Person not found!'
    })
  }

  response.json(person)
})

router.put("/", (request, response) => {
  const id = parseInt( request.body.id )
  const name = request.body.name

  // Handle error: Name and id are required
  if( !name || !id ) {
    response.status(404).json({
      message: 'Please provide an id and name'
    })
  }

  // Handle error: Person not found
  const person = updatePerson(id, name)
  if( !person ) {
    response.status(400).json({
      message: 'Person not found!'
    })
  }

  response.json({
    success: true,
    message: 'Person updated!',
    person
  })
})

router.delete("/:id", (request, response) => {
  const id = parseInt(request.params.id)

  const result = removePerson(id)

  // Handle error: Person not found
  if( !result ) {
    response.status(404).json({
      message: 'Person not found!'
    })
  }

  response.json({
    success: true,
    message: 'Person removed!'
  })
})

module.exports = router;