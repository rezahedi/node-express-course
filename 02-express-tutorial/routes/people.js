const express = require("express");
const router = express.Router();
const { people } = require("../data");

router.get("/", (request, response) => {
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
  people.push({
    id: people.length + 1,
    name
  })

  response.status(201).json({
    success: true,
    name
  })
})

module.exports = router;