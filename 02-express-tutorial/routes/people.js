const express = require("express");
const router = express.Router();
const { addPerson, getPeople, getPerson } = require("../controllers/people");

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

module.exports = router;