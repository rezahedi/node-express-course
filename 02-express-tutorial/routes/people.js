const express = require("express");
const router = express.Router();
const {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  removePerson
} = require("../controllers/people");

router.get("/", getPeople)
router.post("/", addPerson)
router.get("/:id", getPerson)
router.put("/", updatePerson)
router.delete("/:id", removePerson)

module.exports = router;